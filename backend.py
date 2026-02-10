import os
import sys
import shutil
import uuid
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# --- 1. SETUP PATHS ---
# Fixed 'dirname' and path logic
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(BASE_DIR, "Stargazer_Agent"))

from Stargazer_Agent.master import build_stargazer_agent

app = FastAPI()


class NewsRequest(BaseModel):
    topic: str


# --- 2. CORS MIDDLEWARE ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your React App URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow GET, POST, etc.
    allow_headers=["*"],
)

# --- 3. LOAD BRAIN ---
print("🚀 Server Starting... Waking up Stargazer...")
agent = build_stargazer_agent()
print("✅ Stargazer is Ready!")

# --- 4. ENDPOINTS ---


@app.get("/")
def health_check():
    return {"status": "Online", "message": "Celestic AI is listening..."}


@app.post("/analyze")
async def analyze_star(
    image: UploadFile = File(...), lat: str = Form(...), lon: str = Form(...)
):
    """
    Receives an image + GPS, saves it temporarily, and feeds it to the Agent.
    """
    # Use absolute path for temp file
    temp_filename = os.path.join(BASE_DIR, f"temp_{image.filename}")

    # Generate a unique session ID for this request
    thread_id = str(uuid.uuid4())
    config = {"configurable": {"thread_id": thread_id}}

    try:
        # Step A: Save File to Disk
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        # Step B: Create Prompt
        user_msg = (
            f"I am at Lat: {lat}, Lon: {lon}. Analyze this image: {temp_filename}"
        )
        print(f"User Query: {user_msg}")

        # Step C: Run Agent (LangGraph Style)
        # We must pass 'messages' and 'config'
        response = agent.invoke({"messages": [("user", user_msg)]}, config=config)

        # Step D: Return Result
        # In LangGraph, the response is a dictionary containing the state.
        # We want the content of the last message (the AI's answer).
        final_answer = response["messages"][-1].content
        return {"analysis": final_answer}

    except Exception as e:
        print(f"❌ Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # Step E: Cleanup
        if os.path.exists(temp_filename):
            os.remove(temp_filename)


# --- NEWS ENDPOINT ---
class NewsRequest(BaseModel):
    topic: str


@app.post("/news")
async def get_space_news(request: NewsRequest):
    try:
        thread_id = str(uuid.uuid4())
        config = {"configurable": {"thread_id": thread_id}}

        user_msg = f"Tell me the latest space news about: {request.topic}"

        # Invoke with Config + Messages format
        response = agent.invoke({"messages": [("user", user_msg)]}, config=config)

        final_answer = response["messages"][-1].content
        return {"news": final_answer}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
