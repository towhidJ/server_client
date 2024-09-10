import { MongoClient } from "mongodb";
const MONGODB_URI =
  "mongodb+srv://towhid:9sb1LYihQWrDQs9H@rapid.5nlg7.mongodb.net/?retryWrites=true&w=majority&appName=rapid";

const client = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to persist the client connection
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, connect directly
  clientPromise = client.connect();
}

export async function POST(request) {
  const { productName, description, mobileNo, customerName, brandName } =
    await request.json();

  if (!productName || !description || !customerName) {
    return new Response(
      JSON.stringify({ message: "Required fields are missing" }),
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("survive"); // Replace with your actual DB name

    const result = await db.collection("products").insertOne({
      productName,
      description,
      mobileNo,
      customerName,
      brandName,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: "Product added successfully", data: result }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
