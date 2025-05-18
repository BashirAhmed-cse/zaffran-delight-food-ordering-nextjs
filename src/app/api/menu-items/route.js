import {isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {MenuItem} from "@/models/MenuItem";
import mongoose from "mongoose";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();

  if (!(await isAdmin())) {
    return Response.json({}, { status: 403 });
  }

  // ✅ Validate `category` field
  if (!data.category || !mongoose.Types.ObjectId.isValid(data.category)) {
    return Response.json({ error: "Invalid or missing category" }, { status: 400 });
  }

  try {
    const menuItemDoc = await MenuItem.create(data);
    return Response.json(menuItemDoc);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to create menu item" }, { status: 500 });
  }
}


export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  if (!(await isAdmin())) {
    return Response.json({}, { status: 403 });
  }

  const { _id, ...data } = await req.json();

  // ✅ Validate category if present
  if (data.category && !mongoose.Types.ObjectId.isValid(data.category)) {
    return Response.json({ error: "Invalid category" }, { status: 400 });
  }

  try {
    await MenuItem.findByIdAndUpdate(_id, data);
    return Response.json(true);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to update menu item" }, { status: 500 });
  }
}


export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(
    await MenuItem.find()
  );
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (await isAdmin()) {
    await MenuItem.deleteOne({_id});
  }
  return Response.json(true);
}