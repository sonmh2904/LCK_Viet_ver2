export interface Province {
  province_code: number;
  name: string;
}

export interface Ward {
  ward: string;
}

// Lấy danh sách tỉnh/thành phố. Trả về Promise<Province[]>
export const getProvinces = async (): Promise<Province[]> => {
  try {
    const response = await fetch("https://34tinhthanh.com/api/provinces");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
};

// Lấy danh sách xã/phường theo mã tỉnh. Trả về Promise<Ward[]>
export const getWardsByProvinceCode = async (
  provinceCode: number
): Promise<Ward[]> => {
  if (!provinceCode || provinceCode <= 0) {
    throw new Error("Invalid province code");
  }

  try {
    // Thử với các API endpoints khác nhau
    const endpoints = [
      `https://34tinhthanh.com/api/wards?province_code=${provinceCode}`,
      `https://34tinhthanh.com/api/wards/${provinceCode}`,
      `https://34tinhthanh.com/api/provinces/${provinceCode}/wards`,
      `https://provinces-api-v1.onrender.com/api/provinces/${provinceCode}/districts`,
      `https://vapi.vnapp.vn/api/province/${provinceCode}/district`,
      `https://api.vietqr.io/v2/provinces/${provinceCode}/districts`,
      `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`,
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`Trying endpoint: ${endpoint}`);
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          // Thêm timeout để không chờ quá lâu
          signal: AbortSignal.timeout(10000), // 10 seconds
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log(`Success with endpoint: ${endpoint}`, data);
          
          // Handle different response formats
          if (Array.isArray(data)) {
            return data.map((ward: any) => ({
              ward: typeof ward === 'string' ? ward : ward.ward_name || ward.name || ward.district_name || ward,
            }));
          } else if (data.wards && Array.isArray(data.wards)) {
            return data.wards.map((ward: any) => ({
              ward: typeof ward === 'string' ? ward : ward.ward_name || ward.name || ward.district_name || ward,
            }));
          } else if (data.data && Array.isArray(data.data)) {
            return data.data.map((ward: any) => ({
              ward: typeof ward === 'string' ? ward : ward.ward_name || ward.name || ward.district_name || ward,
            }));
          } else if (data.districts && Array.isArray(data.districts)) {
            return data.districts.map((ward: any) => ({
              ward: typeof ward === 'string' ? ward : ward.ward_name || ward.name || ward.district_name || ward,
            }));
          } else if (data.results && Array.isArray(data.results)) {
            return data.results.map((ward: any) => ({
              ward: typeof ward === 'string' ? ward : ward.ward_name || ward.name || ward.district_name || ward,
            }));
          }
        }
      } catch (error) {
        console.log(`Failed with endpoint ${endpoint}:`, error);
        continue; // Thử endpoint tiếp theo
      }
    }

    // Nếu tất cả endpoints đều fail, trả về mảng rỗng
    console.warn(`All endpoints failed for province code ${provinceCode}. Returning empty array.`);
    return [];
    
  } catch (error) {
    console.error("Error fetching wards:", error);
    return [];
  }
};
