import { db } from "@/server/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("无效的邮箱地址"),
  password: z.string().min(6, "密码至少需要6个字符"),
  name: z.string().min(1, "姓名不能为空").optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // 检查用户是否已存在
    const existingUser = await db.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "该邮箱已被注册" },
        { status: 400 },
      );
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // 创建用户
    const user = await db.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name || validatedData.email.split("@")[0],
        role: "USER",
        hasAccess: false,
      },
    });

    // 不返回密码
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "注册成功",
        user: userWithoutPassword,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message || "验证失败" },
        { status: 400 },
      );
    }

    console.error("注册错误:", error);
    return NextResponse.json(
      { error: "注册失败，请重试" },
      { status: 500 },
    );
  }
}

