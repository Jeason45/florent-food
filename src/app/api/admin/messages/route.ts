import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET - Liste des messages
export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session?.isLoggedIn) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where: any = {};
    if (status && status !== "all") {
      where.status = status.toUpperCase();
    }

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Compter par statut
    const counts = await prisma.contactMessage.groupBy({
      by: ["status"],
      _count: true,
    });

    const stats = {
      total: messages.length,
      unread: counts.find((c) => c.status === "UNREAD")?._count || 0,
      read: counts.find((c) => c.status === "READ")?._count || 0,
      replied: counts.find((c) => c.status === "REPLIED")?._count || 0,
    };

    return NextResponse.json({ success: true, messages, stats });
  } catch (error) {
    console.error("Erreur GET messages:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des messages" },
      { status: 500 }
    );
  }
}

// PATCH - Mettre à jour le statut d'un message
export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session?.isLoggedIn) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID et statut requis" },
        { status: 400 }
      );
    }

    const updateData: any = { status };
    if (status === "READ") {
      updateData.readAt = new Date();
    } else if (status === "REPLIED") {
      updateData.repliedAt = new Date();
    }

    const message = await prisma.contactMessage.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error("Erreur PATCH message:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un message
export async function DELETE(request: Request) {
  try {
    const session = await getSession();
    if (!session?.isLoggedIn) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID requis" }, { status: 400 });
    }

    await prisma.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur DELETE message:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
