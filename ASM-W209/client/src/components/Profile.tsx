import { Button, Container, TextField, Typography, Stack, Box, Divider, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type ProfileFormValues = {
  username: string;
  avatar: string;
  password: string;
};

const Profile = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
    defaultValues: {
      username: JSON.parse(localStorage.getItem("user") || "null")?.username || '',
      avatar: JSON.parse(localStorage.getItem("user") || "null")?.avatar || '',
    }
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await axios.put("/user/profile", data); // API endpoint to update profile
      localStorage.setItem("user", JSON.stringify(data)); // Update local storage
      navigate("/");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Stack direction="row" spacing={4}>
        {/* Sidebar */}
        <Paper sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            User Info
          </Typography>
          <Stack spacing={2}>
            <Typography variant="body1" color="green" fontWeight="bold">
              {user?.username}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user?.email}
            </Typography>
            <Divider />
            <Button variant="contained" color="primary" onClick={() => navigate("/change-password")}>
              Change Password
            </Button>
          </Stack>
        </Paper>

        {/* Main Content */}
        <Box flex={1}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" mb={2}>
              Profile Information
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                component="img"
                src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg"
                // src={user?.avatar || '/default-avatar.png'}
                alt="avatar"
                sx={{ width: 100, height: 100, borderRadius: '50%' }}
              />
              <Typography variant="h5" fontWeight="bold" sx={{ ml: 2 }}>
                {user?.username}
              </Typography>
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" mb={2}>
              Edit Profile
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <TextField
                  label="Username"
                  {...register('username', { required: "Username is required" })}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
                <TextField
                  label="Avatar URL"
                  {...register('avatar')}
                  error={!!errors.avatar}
                  helperText={errors.avatar?.message}
                />
            
                <Button variant="contained" type="submit">
                  Update Profile
                </Button>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Stack>
    </Container>
  );
};

export default Profile;
