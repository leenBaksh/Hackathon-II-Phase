# Hugging Face Spaces Deployment Guide

## Quick Deploy Steps

### 1. Push Code to GitHub

Make sure your backend code is committed and pushed to GitHub:

```bash
git add .
git commit -m "Add Hugging Face Spaces deployment configuration"
git push origin main
```

### 2. Create Hugging Face Space

1. Go to https://huggingface.co/spaces
2. Click "Create new Space"
3. Fill in details:
   - **Owner**: Your username
   - **Space Name**: `sandleen-auraflow` (or your preferred name)
   - **SDK**: Select "Docker"
   - **Space Hardware**: CPU (free tier)
   - **Visibility**: Public
4. Click "Create Space"

### 3. Link GitHub Repository

1. In your Space settings, go to "Files and versions"
2. Click "Link to GitHub"
3. Select your repository and the backend folder
4. Enable automatic deployments on push

### 4. Set Environment Variables

In your Space settings, add these **Repository Secrets**:

```
DATABASE_URL=postgresql://neondb_owner:npg_RqTjs5Df3klG@ep-restless-bread-aijcxja6-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
OPENAI_API_KEY=your_openai_api_key_here
PORT=7860
ALLOWED_ORIGINS=*
ENVIRONMENT=production
```

### 5. Verify Deployment

Wait for the build to complete (check the "Logs" tab), then test:

```bash
# Test health endpoint
curl https://sandleen-auraflow.hf.space/health

# Test API health
curl https://sandleen-auraflow.hf.space/api/health
```

### 6. Update Frontend Environment

Update your frontend `.env.local` with the correct API URL:

```env
NEXT_PUBLIC_API_BASE_URL=https://sandleen-auraflow.hf.space
```

## Troubleshooting 503 Errors

### Space is Sleeping
Hugging Face free tier Spaces go to sleep after ~48 hours of inactivity. The first request will wake it up (takes 10-30 seconds).

### Build Failures
Check the "Logs" tab in your Space for build errors.

Common issues:
- Missing environment variables
- Database connection failures
- Port conflicts (must use 7860)

### Database Connection Issues
Ensure:
1. `DATABASE_URL` is correctly set in Space secrets
2. Neon database allows connections from Hugging Face IPs
3. Connection string includes `sslmode=require`

### CORS Errors
The backend allows all origins (`*`) by default. If you need specific origins, update `ALLOWED_ORIGINS`.

## Important Notes

1. **Sleeping Spaces**: Free tier Spaces sleep after inactivity. First request wakes them up.
2. **Environment Variables**: Must be set in Space settings as Repository Secrets
3. **Port**: Must use port 7860 for Hugging Face Spaces
4. **Logs**: Check the "Logs" tab for debugging
5. **Restart**: Use "Factory Reboot" in settings to restart the Space

## Monitoring

Check Space status:
- **Running**: Space is active and responding
- **Sleeping**: Space is inactive (wakes on first request)
- **Building**: Space is building/deploying
- **Error**: Check logs for details
