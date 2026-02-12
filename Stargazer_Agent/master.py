import os
import sys
from dotenv import load_dotenv

# --- FIXED IMPORTS ---
from langchain.agents import create_agent  # Updated from langgraph.prebuilt

# from langchain_openai import ChatOpenAI
from langchain_groq import ChatGroq
from langgraph.checkpoint.memory import InMemorySaver

# --- Path handling for local imports ---
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import your tools
try:
    from astronomy import get_sky_data
    from news_expert import fetch_space_news
    from inference_cv_script import predict_constellation
except ImportError as e:
    print(f"CRITICAL ERROR: Could not import tools. Check filenames! {e}")
    sys.exit(1)

load_dotenv()

# --- SYSTEM PROMPT ---
SYSTEM_PROMPT = """
Your name is Stargazer, you are a space enthusiast and astronomy expert.

YOUR TOOLS:
1. 'predict_constellation': Use this FIRST when the user gives an image path. 
   - This tool returns a list of CONFIDENCE SCORES (e.g.,{'Orion': 95.0, 'Leo': 2.0, ...}).
2. 'get_sky_data': ALWAYS use this after predicting a constellation.
   - Use the user's Lat/Lon (if provided) to check if that constellation is actually visible.
   - If the Vision model says "Orion" but Sky Data says "Orion is below horizon", WARN the user.
3. 'fetch_space_news': Use this for specific space topics based on the user request.

OUTPUT FORMAT (Visual Analysis):
- 🔭 **Identification**: [Constellation Name] (Confidence: [X]%)
- 🌍 **Visibility Check**: [Visible/Not Visible at user location]
- 🧭 **Guide**: "Look [Direction] to see it. Nearby you can also see [Planet/Star]."

OUTPUT FORMAT (News):
- 📰 **Headlines**: [Summary of the news user asked for]
- **Did you know?**: [Fun Fact]
"""


# --- BUILD AGENT (CORRECTED) ---
def build_stargazer_agent():
    # Initialize the LLM
    # llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    llm = ChatGroq(model="openai/gpt-oss-120b", temperature=0)

    # List of tools
    tools = [get_sky_data, fetch_space_news, predict_constellation]

    # Initialize Memory
    memory = InMemorySaver()

    # Create the agent (UPDATED: create_agent instead of create_react_agent)
    agent = create_agent(
        model=llm,
        tools=tools,
        checkpointer=memory,
        system_prompt=SYSTEM_PROMPT,  # Correct parameter name
    )

    return agent


# --- RUNNER ---
if __name__ == "__main__":
    print("🤖 Stargazer is Online...")
    agent = build_stargazer_agent()

    # Thread ID for memory
    config = {"configurable": {"thread_id": "test_user_1"}}

    # Test case (COMMENTED OUT FOR PRODUCTION SAFETY)
    # test_img = r"C:\Users\BIT\OneDrive\Orion world\OrionWorld\Celestic_AI\ursa_maj.png"
    # user_msg = f"I am at Lat: 23.4, Lon: 85.4. Analyze this image: {test_img}"
    # print(f"\nUser: {user_msg}")
    #
    # # Stream the response
    # events = agent.stream(
    #     {"messages": [("user", user_msg)]}, config, stream_mode="values"
    # )
    #
    # for event in events:
    #     if "messages" in event:
    #         print(f"\n📢 {event['messages'][-1].content}")
