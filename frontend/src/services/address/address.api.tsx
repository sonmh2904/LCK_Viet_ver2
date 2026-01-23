export interface Province {
  province_code: number;
  name: string;
}

export interface Ward {
  ward: string;
}

/**
 * Lấy danh sách tỉnh/thành
 */
export const getProvinces = async (): Promise<Province[]> => {
  const res = await fetch("https://provinces.open-api.vn/api/p/");
  if (!res.ok) throw new Error("Failed to fetch provinces");

  const data = await res.json();

  return data.map((p: { code: number; name: string }) => ({
    province_code: p.code,
    name: p.name,
  }));
};

/**
 * Lấy danh sách xã/phường theo mã tỉnh
 * (flow: Province → District → Ward)
 */
export const getWardsByProvinceCode = async (
  provinceCode: number
): Promise<Ward[]> => {
  if (!provinceCode) return [];

  // 1️⃣ Lấy tỉnh + danh sách huyện
  const provinceRes = await fetch(
    `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
  );
  if (!provinceRes.ok) throw new Error("Failed to fetch districts");

  const provinceData = await provinceRes.json();

  if (!provinceData.districts?.length) return [];

  // 2️⃣ Lấy xã theo từng huyện
  const wardRequests = provinceData.districts.map(
    (d: { code: number }) =>
      fetch(`https://provinces.open-api.vn/api/d/${d.code}?depth=2`)
        .then(res => res.json())
        .then(district =>
          (district.wards || []).map((w: { name: string }) => ({
            ward: w.name,
          }))
        )
  );

  const wardArrays = await Promise.all(wardRequests);

  // 3️⃣ Gộp lại thành 1 mảng
  return wardArrays.flat();
};
