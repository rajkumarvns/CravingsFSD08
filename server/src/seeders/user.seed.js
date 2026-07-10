import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const userSeed = async () => {
  try {
    const UserData = [
      {
        fullName: "Manager1",
        email: "manager1@gmail.com".toLowerCase(),
        password: await bcrypt.hash("Manager@123", 10),
        dob: "2000-01-01",
        gender: "other",
        userType: "restaurant",
        phone: "9876543210",
        photo: { url: "https://placehold.co/600x400?text=M", publicId: null },
      },
      {
        fullName: "Customer1",
        email: "customer1@gmail.com".toLowerCase(),
        password: await bcrypt.hash("Customer@123", 10),
        dob: "2000-01-01",
        gender: "other",
        userType: "customer",
        phone: "9876543210",
        photo: { url: "https://placehold.co/600x400?text=C", publicId: null },
      },
      {
        fullName: "Rider1",
        email: "rider1@gmail.com".toLowerCase(),
        password: await bcrypt.hash("Rider@123", 10),
        dob: "2000-01-01",
        gender: "other",
        userType: "rider",
        phone: "9876543210",
        photo: { url: "https://placehold.co/600x400?text=R", publicId: null },
      },

      {
        fullName: "admin1",
        email: "admin1@gmail.com".toLowerCase(),
        password: await bcrypt.hash("Admin@123", 10),
        dob: "2000-01-01",
        gender: "male",
        userType: "admin",
        phone: "9876543210",
        photo: { url: "https://placehold.co/600x400?text=R", publicId: null },
      },
    ];

    for (const user of UserData) {
      const existingUser = await User.findOne({ email: user.email });

      if (existingUser) {
        console.log(`Existing ${user.userType} Found`);
        await existingUser.deleteOne();
      }

      await User.create(user);
      console.log(`${user.userType} Created Successfully`);
    }
  } catch (error) {
    console.log("User Not Created");
    throw error;
  }
};

export default userSeed;
