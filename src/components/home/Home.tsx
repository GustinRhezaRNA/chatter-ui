import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Paper
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BlurCircularIcon from "@mui/icons-material/BlurCircular";

const Home = () => {

  const items = [
    { icon: <DescriptionIcon />, label: "Send document" },
    { icon: <PersonAddIcon />, label: "Add contact" },
    { icon: <BlurCircularIcon />, label: "Ask AI" }
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0f1412",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 5,
        p: 2
      }}
    >
      {/* Card Utama */}
      <Card
        sx={{
          width: 380,
          bgcolor: "#1c1f1d",
          borderRadius: 4,
          textAlign: "center",
          p: 3,
          color: "white"
        }}
      >
        <CardContent>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Download Chatter for Windows
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "gray", mb: 3 }}
          >
            Get extra features like voice and video calling,
            screen sharing, and more.
          </Typography>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#6A52DE",
              borderRadius: 5,
              px: 4,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#8e7bf1ff"
              }
            }}
          >
            Soon
          </Button>
        </CardContent>
      </Card>

      {/* Menu Bawah */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
      >
        {items.map((item, index) => (
          <Grid size="auto" key={index}>
            <Box textAlign="center">
              <Paper
                elevation={0}
                sx={{
                  width: 90,
                  height: 90,
                  bgcolor: "#1c1f1d",
                  borderRadius: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  mb: 1,
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": {
                    bgcolor: "#2a2d2b"
                  }
                }}
              >
                {item.icon}
              </Paper>
              <Typography variant="body2" color="gray">
                {item.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Home