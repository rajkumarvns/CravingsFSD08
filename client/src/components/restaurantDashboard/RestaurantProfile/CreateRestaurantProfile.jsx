import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineAddAPhoto, MdDelete, MdRestaurantMenu } from "react-icons/md";
import api from "../../../config/ApiConfig";
import runningLoader from "../../../assets/runningLoader.gif";

const MAX_IMAGE_SIZE_BYTES = 5242880; // 5MB
const MAX_GALLERY_IMAGES = 8;

const CreateRestaurantProfile = ({ onSuccess, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [restaurantImages, setRestaurantImages] = useState([]);
  const [restaurantImagesPreview, setRestaurantImagesPreview] = useState([]);

  const [formData, setFormData] = useState({
    restaurantName: "", address: "", city: "", state: "", pinCode: "", country: "", description: "", restaurantType: "both", cuisineTypes: "", lat: "", lon: "",
    legalName: "", companyType: "", gstCertificate: "", fssaiCertificate: "", panCard: "",
    bankName: "", accountNumber: "", ifscCode: "",
    contactEmail: "", contactPhone: "", openingTime: "", closingTime: "",
    facebookUrl: "", instagramUrl: "", twitterUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE_BYTES) return toast.error("Cover image size must be less than 5MB");
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRestaurantImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (restaurantImagesPreview.length + files.length > MAX_GALLERY_IMAGES) {
      return toast.error(`You can only upload up to ${MAX_GALLERY_IMAGES} gallery images.`);
    }
    const validFiles = [];
    const newPreviews = [];
    for (let file of files) {
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        toast.error(`File ${file.name} is larger than 5MB and was skipped.`);
        continue;
      }
      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }
    if (validFiles.length > 0) {
      setRestaurantImages((prev) => [...prev, ...validFiles]);
      setRestaurantImagesPreview((prev) => [...prev, ...newPreviews]);
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
      setUploadProgress(0);
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
      
      const cuisines = formData.cuisineTypes.split(",").map(c => c.trim()).filter(c => c);
      cuisines.forEach((c) => payload.append("cuisineTypes", c));
      
      payload.append("geoLocation.lat", formData.lat);
      payload.append("geoLocation.lon", formData.lon);

      // Documents
      payload.append("documents.legalName", formData.legalName);
      payload.append("documents.companyType", formData.companyType);
      payload.append("documents.gstCertificate", formData.gstCertificate);
      payload.append("documents.fssaiCertificate", formData.fssaiCertificate);
      payload.append("documents.panCard", formData.panCard);

      // Financials
      payload.append("financialDetails.bankName", formData.bankName);
      payload.append("financialDetails.accountNumber", formData.accountNumber);
      payload.append("financialDetails.ifscCode", formData.ifscCode);

      // Contact
      payload.append("contactDetails.email", formData.contactEmail);
      payload.append("contactDetails.phone", formData.contactPhone);
      payload.append("servingHours.openingTime", formData.openingTime);
      payload.append("servingHours.closingTime", formData.closingTime);

      // Social Media
      const socialLinks = [];
      if (formData.facebookUrl) socialLinks.push({ platform: "facebook", url: formData.facebookUrl });
      if (formData.instagramUrl) socialLinks.push({ platform: "instagram", url: formData.instagramUrl });
      if (formData.twitterUrl) socialLinks.push({ platform: "twitter", url: formData.twitterUrl });
      
      if (socialLinks.length > 0) {
        payload.append("socialMediaLinks", JSON.stringify(socialLinks));
      }

      if (coverImage) payload.append("coverImage", coverImage);
      if (restaurantImages.length > 0) {
        restaurantImages.forEach((image) => payload.append("restaurantImage", image));
      }

      const response = await api.post("/restaurant/update-profile", payload, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      toast.success(response.data.message || "Restaurant Profile Created Successfully!");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create profile");
      setUploadProgress(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-16 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-(--color-primary) to-orange-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <MdRestaurantMenu /> Let's Get Started!
          </h2>
          <p className="text-orange-100 max-w-2xl">
            Welcome to Cravings! To activate your restaurant dashboard, please complete your full profile below. You only need to do this once, and you can edit individual sections later!
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      </div>

      {/* SECTION 1: Basic Details */}
      <div className="bg-(--color-base-100) p-6 rounded-2xl shadow-md border border-(--color-base-300) hover:shadow-xl transition-all duration-300 transform">
        <h3 className="text-xl font-bold text-(--color-base-content) border-b-2 border-(--color-primary) pb-2 inline-block mb-6">Basic Details & Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Restaurant Name</label>
            <input type="text" name="restaurantName" value={formData.restaurantName} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Restaurant Type</label>
            <select name="restaurantType" value={formData.restaurantType} onChange={handleChange} className="px-3 py-2 border rounded bg-white focus:ring-2 focus:ring-(--color-primary) outline-none transition-all">
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
              <option value="jain">Jain</option>
              <option value="vegan">Vegan</option>
              <option value="both">Both</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 col-span-full">
            <label className="text-sm font-medium">Cuisine Types (Comma Separated)</label>
            <input type="text" name="cuisineTypes" value={formData.cuisineTypes} onChange={handleChange} placeholder="e.g. Italian, Chinese" required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1 col-span-full">
            <label className="text-sm font-medium">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" rows="3"></textarea>
          </div>
          <div className="flex flex-col gap-1 col-span-full md:col-span-2">
            <label className="text-sm font-medium">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Pin Code</label>
            <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Country</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
        </div>
      </div>

      {/* SECTION 2: Photos */}
      <div className="bg-(--color-base-100) p-6 rounded-2xl shadow-md border border-(--color-base-300) hover:shadow-xl transition-all duration-300 transform">
        <h3 className="text-xl font-bold text-(--color-base-content) border-b-2 border-(--color-primary) pb-2 inline-block mb-6">Restaurant Photos</h3>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Cover Image - 40% (col-span-2) */}
          <div className="lg:col-span-2 flex flex-col h-full">
            <h4 className="font-bold mb-3 text-sm text-(--color-base-content) uppercase tracking-wide">Cover Image</h4>
            <div className="relative w-full grow min-h-75 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-300 group hover:border-(--color-primary) transition-colors duration-300 shadow-inner">
              {coverImagePreview ? (
                <img src={coverImagePreview} alt="Restaurant Cover Preview" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="flex flex-col items-center opacity-50 relative z-10">
                  <MdOutlineAddAPhoto className="text-5xl mb-2 text-gray-400" />
                  <span className="text-lg font-medium text-gray-500">No Cover Image</span>
                </div>
              )}
              <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer text-white backdrop-blur-sm z-20">
                <MdOutlineAddAPhoto className="text-5xl mb-3 animate-bounce" />
                <span className="text-lg font-bold tracking-wide">Upload Cover (Max 5MB)</span>
                <input type="file" accept="image/*" required={!coverImagePreview} onChange={handleCoverImageChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* Gallery Images - 60% (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col h-full">
            <div className="flex justify-between items-end mb-4">
              <h4 className="font-bold text-sm text-(--color-base-content) uppercase tracking-wide">Gallery Images <span className="text-gray-400 font-normal lowercase">(Max 8, 5MB each)</span></h4>
              <label className="cursor-pointer bg-white border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white px-4 py-1.5 rounded-lg text-sm flex items-center gap-2 font-bold shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <MdOutlineAddAPhoto className="text-xl" /> Add Gallery
                <input type="file" accept="image/*" multiple onChange={handleRestaurantImagesChange} className="hidden" />
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-200 grow">
              {restaurantImagesPreview.map((src, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <img src={src} alt={`Restaurant Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button type="button" onClick={() => removeRestaurantImage(idx)} className="absolute top-2 right-2 bg-red-500/90 backdrop-blur text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-red-600 hover:scale-110 transform duration-200">
                    <MdDelete className="text-sm" />
                  </button>
                </div>
              ))}
              {restaurantImagesPreview.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center text-gray-400 py-10 border-2 border-dashed border-gray-200 rounded-2xl bg-white min-h-50">
                  <MdOutlineAddAPhoto className="text-5xl mb-3 opacity-30 text-gray-400" />
                  <span className="text-sm font-medium text-gray-500">Upload gallery images to attract customers!</span>
                </div>
              )}
            </div>
            <div className="text-right text-sm font-bold text-gray-500 mt-2">{restaurantImagesPreview.length} / {MAX_GALLERY_IMAGES} uploaded</div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Documents */}
      <div className="bg-(--color-base-100) p-6 rounded-2xl shadow-md border border-(--color-base-300) hover:shadow-xl transition-all duration-300 transform">
        <h3 className="text-xl font-bold text-(--color-base-content) border-b-2 border-(--color-primary) pb-2 inline-block mb-6">Documents & Legal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Legal Name</label>
            <input type="text" name="legalName" value={formData.legalName} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Company Type</label>
            <input type="text" name="companyType" value={formData.companyType} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">GST Certificate (Reg No.)</label>
            <input type="text" name="gstCertificate" value={formData.gstCertificate} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">FSSAI Certificate No.</label>
            <input type="text" name="fssaiCertificate" value={formData.fssaiCertificate} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">PAN Card No.</label>
            <input type="text" name="panCard" value={formData.panCard} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
        </div>
      </div>

      {/* SECTION 4: Financial Details */}
      <div className="bg-(--color-base-100) p-6 rounded-2xl shadow-md border border-(--color-base-300) hover:shadow-xl transition-all duration-300 transform">
        <h3 className="text-xl font-bold text-(--color-base-content) border-b-2 border-(--color-primary) pb-2 inline-block mb-6">Financial Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Bank Name</label>
            <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Account Number</label>
            <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">IFSC Code</label>
            <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
        </div>
      </div>

      {/* SECTION 5: Contact & Hours */}
      <div className="bg-(--color-base-100) p-6 rounded-2xl shadow-md border border-(--color-base-300) hover:shadow-xl transition-all duration-300 transform">
        <h3 className="text-xl font-bold text-(--color-base-content) border-b-2 border-(--color-primary) pb-2 inline-block mb-6">Contact & Hours</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Contact Email</label>
            <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Contact Phone</label>
            <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Opening Time (HH:MM)</label>
            <input type="time" name="openingTime" value={formData.openingTime} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Closing Time (HH:MM)</label>
            <input type="time" name="closingTime" value={formData.closingTime} onChange={handleChange} required className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
        </div>

        <h4 className="text-md font-bold mt-6 mb-4 text-(--color-base-content)">Social Media Links (Optional)</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Facebook URL</label>
            <input type="url" name="facebookUrl" value={formData.facebookUrl} onChange={handleChange} placeholder="https://facebook.com/..." className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Instagram URL</label>
            <input type="url" name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} placeholder="https://instagram.com/..." className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Twitter URL</label>
            <input type="url" name="twitterUrl" value={formData.twitterUrl} onChange={handleChange} placeholder="https://twitter.com/..." className="px-3 py-2 border rounded focus:ring-2 focus:ring-(--color-primary) outline-none transition-all" />
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="mt-8 flex justify-end gap-4">
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            disabled={isLoading}
            className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
        )}
        <button type="submit" disabled={isLoading} className="bg-(--color-primary) text-(--color-primary-content) px-8 py-3 rounded-xl font-bold text-lg disabled:bg-opacity-70 flex items-center justify-center gap-3 shadow-lg hover:shadow-orange-500/40 hover:bg-orange-700 transition-all transform hover:-translate-y-1">
          {isLoading ? (
            <>
              <img src={runningLoader} alt="Loading..." className="w-6 h-6 object-contain" />
              Adding... {uploadProgress > 0 ? `${uploadProgress}%` : ""}
            </>
          ) : (
            "Add Restaurant"
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateRestaurantProfile;
