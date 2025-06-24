"use client";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginWithGoogle() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const profile = await res.json();

        const profileData = {
          email: profile.email,
          username: profile.name,
        };

        const response = await axios.post("/api/auth/signup", profileData);
        console.log("Google Login Response:", response);
        if (response.status === 200) {
          localStorage.setItem("userId", response.data.user._id);
          localStorage.setItem("username", response.data.user.username);
          router.push("/");
        }
      } catch (e) {
        console.error("Failed to fetch user info:", e);
        toast.error("Google-р нэвтрэх амжилтгүй боллоо. Дахин оролдоно уу.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      console.log("Google Login Failed");
      toast.error("Google-р нэвтрэх амжилтгүй боллоо. Дахин оролдоно уу.");
      setIsLoading(false);
    },
    flow: "implicit",
  });

  const handleLogin = () => {
    setIsLoading(true);
    login();
  };

  return (
    <div className="w-full flex justify-center">
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="transition-all bg-white border border-gray-300 rounded-[24px] px-4 py-2 flex justify-center items-center gap-2 hover:bg-[#E6E6E6] hover:border-[#E6E6E6] w-full cursor-pointer"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
            <span className="ml-2 font-medium text-[12px] sm:text-[16px]">
              Уншиж байна...
            </span>
          </div>
        ) : (
          <>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_26_196)">
                <path
                  d="M5.92208 0.559161C4.22352 1.14841 2.75868 2.26682 1.74272 3.75012C0.726771 5.23341 0.213255 7.00341 0.277604 8.80013C0.341953 10.5968 0.980775 12.3256 2.10024 13.7324C3.2197 15.1392 4.76079 16.15 6.49716 16.6162C7.90487 16.9794 9.37973 16.9954 10.795 16.6627C12.077 16.3747 13.2623 15.7587 14.2348 14.875C15.247 13.9272 15.9816 12.7214 16.3598 11.3874C16.7709 9.93661 16.844 8.41095 16.5736 6.92752H8.66864V10.2067H13.2467C13.1552 10.7297 12.9591 11.2288 12.6702 11.6743C12.3813 12.1197 12.0055 12.5023 11.5653 12.7992C11.0063 13.169 10.3761 13.4178 9.7152 13.5296C9.0524 13.6529 8.37254 13.6529 7.70973 13.5296C7.03795 13.3907 6.40246 13.1135 5.84372 12.7155C4.9461 12.0801 4.27212 11.1774 3.91794 10.1363C3.55777 9.07562 3.55777 7.92575 3.91794 6.8651C4.17005 6.12164 4.58683 5.44472 5.13716 4.88486C5.76694 4.23242 6.56427 3.76605 7.44166 3.53692C8.31905 3.30779 9.2426 3.32476 10.111 3.58596C10.7894 3.7942 11.4097 4.15803 11.9225 4.64846C12.4387 4.13492 12.9541 3.62005 13.4685 3.10385C13.7341 2.82627 14.0236 2.56197 14.2853 2.27775C13.5024 1.54925 12.5835 0.982377 11.5812 0.60963C9.75598 -0.0531181 7.75885 -0.0709288 5.92208 0.559161Z"
                  fill="white"
                />
                <path
                  d="M5.92212 0.559196C7.75874 -0.071322 9.75587 -0.0539801 11.5813 0.608337C12.5838 0.983617 13.5022 1.55322 14.284 2.28443C14.0184 2.56865 13.7381 2.83427 13.4672 3.11052C12.9519 3.62495 12.437 4.13761 11.9226 4.64849C11.4097 4.15807 10.7894 3.79423 10.111 3.58599C9.24293 3.32388 8.31941 3.30593 7.44179 3.53412C6.56417 3.76231 5.76635 4.22782 5.13587 4.87959C4.58554 5.43944 4.16877 6.11636 3.91666 6.85982L1.16345 4.72818C2.14893 2.77393 3.85523 1.27907 5.92212 0.559196Z"
                  fill="#E33629"
                />
                <path
                  d="M0.432994 6.83987C0.580976 6.10647 0.826655 5.39623 1.16346 4.72815L3.91667 6.8651C3.5565 7.92575 3.5565 9.07563 3.91667 10.1363C2.99937 10.8446 2.08164 11.5565 1.16346 12.2719C0.320304 10.5936 0.0631548 8.68132 0.432994 6.83987Z"
                  fill="#F8BD00"
                />
                <path
                  d="M8.66868 6.92615H16.5737C16.8441 8.40957 16.7709 9.93524 16.3599 11.386C15.9817 12.7201 15.247 13.9258 14.2349 14.8736C13.3463 14.1804 12.4538 13.4924 11.5653 12.7991C12.0058 12.502 12.3818 12.119 12.6707 11.673C12.9597 11.2271 13.1556 10.7274 13.2467 10.204H8.66868C8.66735 9.11224 8.66868 8.01919 8.66868 6.92615Z"
                  fill="#587DBD"
                />
                <path
                  d="M1.16211 12.2719C2.08029 11.5635 2.99802 10.8516 3.91531 10.1362C4.2702 11.1777 4.94515 12.0805 5.84375 12.7154C6.40423 13.1116 7.0411 13.3866 7.71375 13.5229C8.37656 13.6462 9.05641 13.6462 9.71922 13.5229C10.3801 13.4111 11.0103 13.1623 11.5693 12.7925C12.4578 13.4858 13.3503 14.1737 14.2388 14.867C13.2665 15.7512 12.0812 16.3676 10.799 16.656C9.38375 16.9887 7.90888 16.9727 6.50117 16.6095C5.38781 16.3122 4.34785 15.7882 3.44648 15.0702C2.49244 14.3128 1.71322 13.3582 1.16211 12.2719Z"
                  fill="#319F43"
                />
              </g>
              <defs>
                <clipPath id="clip0_26_196">
                  <rect width="17" height="17" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="font-medium text-[12px] sm:text-[16px]">
              Google-р нэвтрэх
            </span>
          </>
        )}
      </button>
    </div>
  );
}
