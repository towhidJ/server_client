import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
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
    const db = client.db("survive");

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
