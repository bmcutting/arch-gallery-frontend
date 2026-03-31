import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import type { User } from "../../domain/entities/user";

interface Props {
  formData: User;
  handleChange: (field: keyof User, value: string) => void;
}

export default function SocialSection({ formData, handleChange }: Props) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex gap-2 items-center text-xl md:text-2xl lg:text-3xl">
        <FaInstagram className="text-pink-500" />
        <input
          placeholder="Instagram"
          value={formData.instagramUrl ?? ""}
          onChange={(e) => handleChange("instagramUrl", e.target.value)}
          className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md 
                 border border-gray-300 focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex gap-2 items-center text-xl md:text-2xl lg:text-3xl">
        <FaTwitter className="text-sky-500" />
        <input
          placeholder="Twitter"
          value={formData.twitterUrl ?? ""}
          onChange={(e) => handleChange("twitterUrl", e.target.value)}
          className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md 
                 border border-gray-300 focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex gap-2 items-center text-xl md:text-2xl lg:text-3xl">
        <FaLinkedin className="text-blue-700" />
        <input
          placeholder="LinkedIn"
          value={formData.linkedinUrl ?? ""}
          onChange={(e) => handleChange("linkedinUrl", e.target.value)}
          className="w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md 
                 border border-gray-300 focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
}
