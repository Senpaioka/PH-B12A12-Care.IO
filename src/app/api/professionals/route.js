import { dbConnect, collections } from "@/db/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body?.fullName || !body?.email || !body?.phone) {
      return Response.json(
        {
          success: false,
          message: "Required fields missing",
        },
        { status: 400 }
      );
    }


    const professionalsCollection = dbConnect(collections.PROFESSIONALS);
    const now = new Date();

    const professional = {
      fullName: body.fullName,
      displayName: body.displayName || body.fullName,
      photoURL: body.photoURL || null,

      date_of_birth: body.date_of_birth
        ? new Date(body.date_of_birth)
        : null,

      gender: body.gender || null,
      nationality: body.nationality || null,
      idNumber: body.idNumber || null,

      country: body.country || null,
      address: body.address || null,

      email: body.email.toLowerCase(),
      phone: body.phone,

      experience: Number(body.experience) || 0,
      employmentType: body.employmentType || null,
      charge: Number(body.charge) || 0,

      languages: body.languages || null,
      roles: Array.isArray(body.roles) ? body.roles : [],
      skills: Array.isArray(body.skills) ? body.skills : [],

      certifications: body.certifications || null,

      terms: Boolean(body.terms),

      createdAt: now,
      updatedAt: now,
    };

    professional.approved = false;

    // check if user already exists
    const existingUser = await professionalsCollection.findOne({
        email: professional.email,
    });

    if (existingUser) {

        const getUserRole = dbConnect(collections.USERS);
        const findUserRole = await getUserRole.findOne({email: professional.email}); 
        
        if (findUserRole.role === "admin") {
            return Response.json(
            {
                success: false,
                message: "admin can't apply for this position",
            },
            { status: 409 }
            );
        };

        // Already registered as caregiver
        if (findUserRole.role === "caregiver") {
            return Response.json(
            {
                success: false,
                message: "You are already registered as a caregiver",
            },
            { status: 409 }
            );
        };
        // under review
        if (findUserRole.role === "user") {
            return Response.json(
            {
                success: false,
                message: "You are already registered and your profile under investigation.",
            },
            { status: 409 }
            );
        };
    }

    const result = await professionalsCollection.insertOne(professional);

    return Response.json(
      {
        success: true,
        message: "Professional profile created",
        data: {
          id: result.insertedId.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create professional error:", error);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
