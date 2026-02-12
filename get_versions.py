import importlib.metadata

# The list of libraries you need for the cloud
target_packages = [
    "fastapi",
    "uvicorn",
    "python-multipart",
    "pydantic",
    "numpy",
    "langchain",
    "langchain-openai",
    "langchain-community",
    "langgraph",
    "skyfield",
    "python-dotenv",
    "pillow",  # Often installed as 'Pillow'
    "tensorflow",  # We check this locally, but write 'tensorflow-cpu' for cloud
    "feedparser",
    "langchain-groq",
]

print("\nCopy everything below this line into your requirements.txt:\n" + "=" * 50)

for package in target_packages:
    try:
        # Handle special case: Pillow
        search_name = "Pillow" if package == "pillow" else package

        # Get the installed version
        version = importlib.metadata.version(search_name)

        # Handle special case: Tensorflow
        # You likely have 'tensorflow' locally, but we want 'tensorflow-cpu' for Render
        if package == "tensorflow":
            print(f"tensorflow-cpu=={version}")
        else:
            print(f"{package}=={version}")

    except importlib.metadata.PackageNotFoundError:
        print(
            f"# WARNING: {package} is not installed locally. Run 'pip install {package}' first."
        )

print("=" * 50 + "\n")
