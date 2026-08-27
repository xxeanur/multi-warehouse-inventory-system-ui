import axios from 'axios';

interface GeocodeResponse {
  lat: string;
  lon: string;
}

export const geocodingService = {
  getCoordinates: async (city: string, district: string, fullAddress: string): Promise<{ latitude: number | null, longitude: number | null }> => {
    try {
      // Adresi olabildiğince açık ve net birleştiriyoruz. "Türkiye" sabit olarak eklenmeli ki servis yurt dışı aramasın.
      const searchQuery = `${fullAddress}, ${district}, ${city}, Türkiye`;
      
      const response = await axios.get<GeocodeResponse[]>('https://nominatim.openstreetmap.org/search', {
        params: {
          q: searchQuery,
          format: 'json',
          limit: 1 // Sadece en olası ilk sonucu getir
        },
        headers: {
          // Nominatim kuralları gereği, servisi kullanan projenin adını veya e-postasını belirtmek iyi bir pratiktir
          'User-Agent': 'MultiWarehouseApp/1.0' 
        }
      });

      if (response.data && response.data.length > 0) {
        return {
          latitude: parseFloat(response.data[0].lat),
          longitude: parseFloat(response.data[0].lon)
        };
      }
      
      // EĞER TAM AÇIK ADRESİ BULAMAZSA: Sadece İl ve İlçe üzerinden tekrar deneme yap (Fallback)
      const fallbackQuery = `${district}, ${city}, Türkiye`;
      const fallbackResponse = await axios.get<GeocodeResponse[]>('https://nominatim.openstreetmap.org/search', {
        params: { q: fallbackQuery, format: 'json', limit: 1 },
        headers: { 'User-Agent': 'MultiWarehouseApp/1.0' }
      });

      if (fallbackResponse.data && fallbackResponse.data.length > 0) {
         return {
          latitude: parseFloat(fallbackResponse.data[0].lat),
          longitude: parseFloat(fallbackResponse.data[0].lon)
        };
      }

      // Yine bulamazsa (çok ücra bir köy veya hatalı yazım) null dönsün
      return { latitude: null, longitude: null };

    } catch (error) {
      console.error("Geocoding hatası (Koordinat bulunamadı):", error);
      return { latitude: null, longitude: null };
    }
  }
};