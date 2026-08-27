"use client";

import { TextField, MenuItem, Grid } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import turkeyData from "@/data/turkey.json";

interface AddressSelectorProps {
  city: string;
  district: string;
  onCityChange: (newCity: string) => void;
  onDistrictChange: (newDistrict: string) => void;
  inputStyle?: SxProps<Theme>;
}

export default function AddressSelector({
  city,
  district,
  onCityChange,
  onDistrictChange,
  inputStyle,
}: AddressSelectorProps) {
  const sortedCities = [...turkeyData].sort((a, b) =>
    a.il.localeCompare(b.il, "tr"),
  );

  const selectedCityData = turkeyData.find((t) => t.il === city);

  const availableDistricts = selectedCityData
    ? [...selectedCityData.ilceleri].sort((a, b) => a.localeCompare(b, "tr"))
    : [];

  return (
    <>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          select
          required
          fullWidth
          size="small"
          label="Şehir (İl)"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          sx={inputStyle}
          slotProps={{
            select: {
              MenuProps: {
                slotProps: {
                  paper: {
                    style: {
                      maxHeight: 350,
                    },
                  },
                },
              },
            },
          }}
        >
          <MenuItem value="" disabled sx={{ display: "none" }}>
            Şehir Seçin
          </MenuItem>
          {sortedCities.map((data) => (
            <MenuItem key={data.il} value={data.il}>
              {data.il}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          select
          required
          fullWidth
          size="small"
          label="İlçe / Semt"
          value={district}
          onChange={(e) => onDistrictChange(e.target.value)}
          sx={inputStyle}
          disabled={!city}
          slotProps={{
            select: {
              MenuProps: {
                slotProps: {
                  paper: {
                    style: {
                      maxHeight: 350,
                    },
                  },
                },
              },
            },
          }}
        >
          <MenuItem value="" disabled sx={{ display: "none" }}>
            İlçe Seçin
          </MenuItem>
          {availableDistricts.map((d) => (
            <MenuItem key={d} value={d}>
              {d}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </>
  );
}