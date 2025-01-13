// const mongoose = require("mongoose");
// const Customer = require("./models/Customer"); // Adjust path as needed

// // MongoDB connection URI
// const mongoURI = "mongodb+srv://debbaner1:Debdeep1@cluster0.d9bhb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB connection string

// (async () => {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB");

//     // Fetch all customers where mobileNo is a string
//     const customers = await Customer.find({
//       mobileNo: { $type: "string" },
//     });

//     console.log(`Found ${customers} customers with string mobileNo`);

//     // Update each customer
//     for (const customer of customers) {
//       // Ensure mobileNo is set as a proper array
//       customer.mobileNo = [customer.mobileNo]; // Convert string to a single-element array
//      // await customer.save(); // Save the updated customer
//       console.log(`Updated customer with ID: ${customer}`);
//     }

//     console.log("All customers updated successfully");
//   } catch (error) {
//     console.error("Error updating customers:", error);
//   } finally {
//     // Disconnect from MongoDB
//     await mongoose.disconnect();
//     console.log("Disconnected from MongoDB");
//   }
// })();


const mongoose = require("mongoose");
const Customer = require("./models/Customer"); // Adjust path as needed
const Zone = require("./models/Zone");

// MongoDB connection URI
const mongoURI = "mongodb+srv://debbaner1:Debdeep1@cluster0.d9bhb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB connection string

(async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Fetch all customers
    const customers = await Customer.find();

    console.log(`Found ${customers} customers`);

    // Update each customer
    for (const customer of customers) {
      // Ensure mobileNo is always an array
      if (!Array.isArray(customer.mobileNo)) {
        customer.mobileNo = [customer.mobileNo];
      }
      await customer.save(); // Save the updated customer
      console.log(`Updated customer with ID: ${customer}`);
    }

    console.log("All customers updated successfully");
  } catch (error) {
    console.error("Error updating customers:", error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
})();



// staging and prod db - json

// zone wise - zone will be an id and landmark will be subid of zone id
// multiple landmarks under 1 zone
// wherever u find Zone, add landmark
// landmark schema - zonal number and other info

// billing - zone id filter
// customers - find customers by zone - already done - landmark wise