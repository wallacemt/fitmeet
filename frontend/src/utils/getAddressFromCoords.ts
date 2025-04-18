export const getAddressFromCoords = async (lat: number, lon: number): Promise<string | null> => {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, {
      headers: {
        "User-Agent": "FitMeet", 
      },
    });

    if (!res.ok) throw new Error("Erro ao buscar endereço");

    const data = await res.json();

    return data.display_name || null;
  } catch (err) {
    console.error("Erro ao buscar endereço:", err);
    return null;
  }
};
