// services/authService.ts

import { unwrapResponse } from "@/lib/apiResponse";
import axiosInstance from "@/lib/axiosInstance";
import {
  LoginDto,
  RefreshTokenDto,
  TokenDto,
  ActiveSessionDto,
  ResetPasswordConfirmDto,
  ForgotPasswordDto,
} from "@/types/identity/auth";
import { CustomResponseDto } from "@/types/common/common";
import Cookies from "js-cookie";

export const authService = {
  // 1. Kullanıcı girişi yapar ve bilgileri (Token + User) LocalStorage'a kaydeder.
  login: async (data: LoginDto): Promise<TokenDto> => {
    const response = await axiosInstance.post<CustomResponseDto<TokenDto>>(
      "/Auth/login",
      data,
    );
    const tokenData = unwrapResponse(response.data);

    // Kullanıcı bilgisini UI tarafında (menülerde vb.) kullanmak üzere saklıyoruz
    localStorage.setItem("userContext", JSON.stringify(tokenData.user));

    return tokenData;
  },

  // 2. Süresi dolan Access Token'ı yeniler.
  refreshToken: async (data: RefreshTokenDto): Promise<TokenDto> => {
    const response = await axiosInstance.post<CustomResponseDto<TokenDto>>(
      "/Auth/refresh-token",
      data,
    );
    return unwrapResponse(response.data);
  },

  // 3. Sistemden güvenli bir şekilde çıkış yapar ve çerezleri/verileri temizler.
  logout: async (): Promise<void> => {
    const currentRefreshToken = Cookies.get("refreshToken");
    try {
      if (currentRefreshToken) {
        await axiosInstance.post("/Auth/logout", {
          token: currentRefreshToken,
        });
      }
    } catch (error) {
      console.error("Logout sırasında backend'e ulaşılamadı:", error);
    } finally {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      localStorage.removeItem("userContext");
      window.location.href = "/login";
    }
  },

  // 4. Kullanıcının açık olan tüm oturumlarını (cihazlarını) getirir.
  getSessionsAsync: async (): Promise<ActiveSessionDto[]> => {
    const currentRefreshToken = Cookies.get("refreshToken") || "";
    const response = await axiosInstance.get<
      CustomResponseDto<ActiveSessionDto[]>
    >("/Auth/sessions", {
      headers: { "X-Refresh-Token": currentRefreshToken },
    });
    return unwrapResponse(response.data);
  },

  // 5. Şüpheli görülen tek bir oturumu (cihazı) zorla kapatır.
  revokeSessionAsync: async (tokenId: string): Promise<void> => {
    const response = await axiosInstance.delete<CustomResponseDto<null>>(
      `/Auth/sessions/${tokenId}`,
    );
    unwrapResponse(response.data);
  },

  // 6. Mevcut cihaz hariç, hesabın açık olduğu diğer tüm cihazlardan çıkış yapar.
  revokeAllOtherSessionsAsync: async (): Promise<void> => {
    const currentRefreshToken = Cookies.get("refreshToken") || "";
    const response = await axiosInstance.delete<CustomResponseDto<null>>(
      `/Auth/sessions/revoke-others`,
      {
        headers: { "X-Refresh-Token": currentRefreshToken },
      },
    );
    unwrapResponse(response.data);
  },

  // 7. Şifresini unutan kullanıcıya sıfırlama bağlantısı gönderir.
  forgotPasswordAsync: async (data: ForgotPasswordDto): Promise<void> => {
    const response = await axiosInstance.post<CustomResponseDto<null>>(
      "/Auth/forgot-password",
      data,
    );
    unwrapResponse(response.data);
  },

  // 8. Maildeki link üzerinden yeni şifreyi belirler.
  resetPasswordAsync: async (data: ResetPasswordConfirmDto): Promise<void> => {
    const response = await axiosInstance.post<CustomResponseDto<null>>(
      "/Auth/reset-password",
      data,
    );
    unwrapResponse(response.data);
  },
};
