import { NextResponse } from "next/server";

const allowedCountries = {
  public: ["Poland", "Germany", "France", "Spain"],
  private: ["Poland", "Germany"],
};

export async function POST(request: Request) {
  const { name, password, country, duration, isPrivate } = await request.json();
  const errors: Record<string, string> = {};

  // Name validation
  if (!name || name.length < 3 || name.length > 50) {
    errors.name = "Name should be between 3 and 50 characters.";
  }

  // Password validation
  if (isPrivate === "Private") {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      errors.password =
        "Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one number, and one special character.";
    }
  }

  // Country validation
  const validCountries =
    allowedCountries[isPrivate.toLowerCase() as "public" | "private"];
  if (!validCountries.includes(country.trim())) {
    errors.country = "Please select a valid country.";
  }

  // Duration validation
  const maxDuration = isPrivate === "Private" ? 20 : Infinity;
  if (!duration || duration <= 0 || duration > maxDuration) {
    errors.duration =
      isPrivate === "Private"
        ? "Duration must be a positive integer and cannot exceed 20 days in private mode."
        : "Duration must be a positive integer.";
  }

  console.log("Errors:", errors);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
