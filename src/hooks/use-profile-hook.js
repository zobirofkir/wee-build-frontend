import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    username: "",
    account_type: "",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);

  const { currentUser } = useSelector(
    (state) => state.getCurrentAuthenticatedUser || {}
  );

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        location: currentUser.location || "",
        username: currentUser.username || currentUser.email || "",
        account_type: currentUser.account_type || "free",
        avatar: null,
      });

      if (currentUser.avatar) {
        setAvatarPreview(currentUser.avatar);
      } else {
        setAvatarPreview(null);
      }
    }
  }, [currentUser]);

  return { formData, avatarPreview };
};
