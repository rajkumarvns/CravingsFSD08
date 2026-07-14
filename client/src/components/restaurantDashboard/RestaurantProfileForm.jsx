import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineAddAPhoto, MdDelete } from "react-icons/md";
import api from "../../config/ApiConfig";
import { useAuth } from "../../context/AuthContext";
import runningLoader from "../../assets/runningLoader.gif";

const RestaurantProfileForm = () => {
  const { user } = useAuth();
  
  // Using params and query parameters as requested
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "edit";

  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [restaurantImages, setRestaurantImages] = useState([]);
  const [restaurantImagesPreview, setRestaurantImagesPreview] = useState([]);

  const [formData, setFormData] = useState({
    restaurantName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    description: "",
    restaurantType: "both",
    cuisineTypes: "",
    
    // GeoLocation
    lat: "",
    lon: "",
    
    // Documents
    legalName: "",
    companyType: "",
    gstCertificate: "",
    fssaiCertificate: "",
    panCard: "",
    
    // Financial Details
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    
    // Contact Details
    contactEmail: "",
    contactPhone: "",
    
    // Serving Hours
    openingTime: "",
    closingTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRestaurantImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setRestaurantImages((prev) => [...prev, ...files]);
      const previews = files.map((file) => URL.createObjectURL(file));
      setRestaurantImagesPreview((prev) => [...prev, ...previews]);
    }
  };

  const removeRestaurantImage = (index) => {
    setRestaurantImages((prev) => prev.filter((_, i) => i !== index));
    setRestaurantImagesPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const payload = new FormData();
      
      // Basic Info
      payload.append("restaurantName", formData.restaurantName);
      payload.append("address", formData.address);
      payload.append("city", formData.city);
      payload.append("state", formData.state);
      payload.append("pinCode", formData.pinCode);
      payload.append("country", formData.country);
      payload.append("description", formData.description);
      payload.append("restaurantType", formData.restaurantType);
      
      // Cuisine Types
      const cuisines = formData.cuisineTypes.split(",").map(c => c.trim()).filter(c => c);
      cuisines.forEach((c) => payload.append("cuisineTypes", c));
      
      // GeoLocation
      payload.append("geoLocation.lat", formData.lat);
      payload.append("geoLocation.lon", formData.lon);
      
      // Documents
      payload.append("documents.legalName", formData.legalName);
      payload.append("documents.companyType", formData.companyType);
      payload.append("documents.gstCertificate", formData.gstCertificate);
      payload.append("documents.fssaiCertificate", formData.fssaiCertificate);
      payload.append("documents.panCard", formData.panCard);
      
      // Financial Details
      payload.append("financialDetails.bankName", formData.bankName);
      payload.append("financialDetails.accountNumber", formData.accountNumber);
      payload.append("financialDetails.ifscCode", formData.ifscCode);
      
      // Contact Details
      payload.append("contactDetails.email", formData.contactEmail);
      payload.append("contactDetails.phone", formData.contactPhone);
      
      // Serving Hours
      payload.append("servingHours.openingTime", formData.openingTime);
      payload.append("servingHours.closingTime", formData.closingTime);

      // Images
      if (coverImage) {
        payload.append("coverImage", coverImage);
      }
      if (restaurantImages.length > 0) {
        restaurantImages.forEach((image) => {
          payload.append("restaurantImage", image);
        });
      }

      const response = await api.post("/restaurant/update-profile", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.message || "Restaurant profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update restaurant profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-10">
      
      {/* Cover Image */}
      <div className="bg-(--color-base-200) p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 border-b border-(--color-base-300) pb-2">Cover Image</h3>
        <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-400">
          {coverImagePreview ? (
            <img src={coverImagePreview} alt="Cover Preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500">No Cover Image Selected</span>
          )}
          <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-white">
            <MdOutlineAddAPhoto className="text-4xl" />
            <input type="file" accept="image/*" onChange={handleCoverImageChange} className="hidden" />
          </label>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-(--color-base-200) p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
        <h3 className="text-lg font-semibold col-span-full mb-2 border-b border-(--color-base-300) pb-2">Basic Details</h3>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Restaurant Name</label>
          <input type="text" name="restaurantName" value={formData.restaurantName} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Restaurant Type</label>
          <select name="restaurantType" value={formData.restaurantType} onChange={handleChange} className="px-3 py-2 border rounded bg-white">
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="jain">Jain</option>
            <option value="vegan">Vegan</option>
            <option value="both">Both</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Cuisine Types (Comma Separated)</label>
          <input type="text" name="cuisineTypes" value={formData.cuisineTypes} onChange={handleChange} placeholder="e.g. Italian, Chinese" required className="px-3 py-2 border rounded" />
        </div>
        
        <div className="flex flex-col gap-1 col-span-full">
          <label className="text-sm font-medium">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required className="px-3 py-2 border rounded" rows="3"></textarea>
        </div>
      </div>

      {/* Location */}
      <div className="bg-(--color-base-200) p-6 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
        <h3 className="text-lg font-semibold col-span-full mb-2 border-b border-(--color-base-300) pb-2">Location</h3>
        
        <div className="flex flex-col gap-1 col-span-full md:col-span-2">
          <label className="text-sm font-medium">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">State</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Pin Code</label>
          <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Country</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Latitude</label>
          <input type="text" name="lat" value={formData.lat} onChange={handleChange} className="px-3 py-2 border rounded" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Longitude</label>
          <input type="text" name="lon" value={formData.lon} onChange={handleChange} className="px-3 py-2 border rounded" />
        </div>
      </div>

      {/* Documents */}
      <div className="bg-(--color-base-200) p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
        <h3 className="text-lg font-semibold col-span-full mb-2 border-b border-(--color-base-300) pb-2">Documents</h3>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Legal Name</label>
          <input type="text" name="legalName" value={formData.legalName} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Company Type</label>
          <input type="text" name="companyType" value={formData.companyType} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">GST Certificate (Reg No.)</label>
          <input type="text" name="gstCertificate" value={formData.gstCertificate} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">FSSAI Certificate No.</label>
          <input type="text" name="fssaiCertificate" value={formData.fssaiCertificate} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">PAN Card No.</label>
          <input type="text" name="panCard" value={formData.panCard} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>
      </div>

      {/* Financial Details */}
      <div className="bg-(--color-base-200) p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
        <h3 className="text-lg font-semibold col-span-full mb-2 border-b border-(--color-base-300) pb-2">Financial Details</h3>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Bank Name</label>
          <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Account Number</label>
          <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">IFSC Code</label>
          <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>
      </div>

      {/* Contact & Hours */}
      <div className="bg-(--color-base-200) p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
        <h3 className="text-lg font-semibold col-span-full mb-2 border-b border-(--color-base-300) pb-2">Contact & Hours</h3>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Contact Email</label>
          <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Contact Phone</label>
          <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Opening Time (HH:MM)</label>
          <input type="time" name="openingTime" value={formData.openingTime} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Closing Time (HH:MM)</label>
          <input type="time" name="closingTime" value={formData.closingTime} onChange={handleChange} required className="px-3 py-2 border rounded" />
        </div>
      </div>

      {/* Restaurant Images */}
      <div className="bg-(--color-base-200) p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4 border-b border-(--color-base-300) pb-2">
          <h3 className="text-lg font-semibold">Restaurant Gallery Images</h3>
          <label className="cursor-pointer bg-(--color-primary) text-white px-3 py-1 rounded text-sm flex items-center gap-2">
            <MdOutlineAddAPhoto /> Add Images
            <input type="file" accept="image/*" multiple onChange={handleRestaurantImagesChange} className="hidden" />
          </label>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {restaurantImagesPreview.map((src, idx) => (
            <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-300 aspect-square">
              <img src={src} alt="Gallery Preview" className="w-full h-full object-cover" />
              <button 
                type="button" 
                onClick={() => removeRestaurantImage(idx)} 
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MdDelete />
              </button>
            </div>
          ))}
          {restaurantImagesPreview.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-6">
              No gallery images selected.
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6 border-t pt-6">
        <button 
          type="button" 
          onClick={() => window.history.back()}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button type="submit" disabled={isLoading} className="bg-(--color-primary) text-(--color-primary-content) px-6 py-2 rounded-lg font-semibold disabled:bg-opacity-70 flex items-center gap-2">
          {isLoading ? (
            <>
              <img src={runningLoader} alt="Loading..." className="w-6 h-6 object-contain" />
              Saving Profile...
            </>
          ) : (
            "Save Restaurant Profile"
          )}
        </button>
      </div>

    </form>
  );
};

export default RestaurantProfileForm;
