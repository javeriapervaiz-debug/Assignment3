# embedding-service/test_embedding.py
import requests
import json

def test_embedding_service():
    """Test the embedding service endpoints"""
    base_url = "http://localhost:8001"
    
    print("Testing Embedding Service...")
    
    # Test health check
    try:
        response = requests.get(f"{base_url}/health")
        print(f"Health Check: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Health check failed: {e}")
        return
    
    # Test single embedding
    try:
        response = requests.post(f"{base_url}/embed", json={"text": "Hello world"})
        print(f"\nSingle Embedding: {response.status_code}")
        data = response.json()
        print(f"Dimension: {data['dimension']}")
        print(f"First 5 values: {data['embedding'][:5]}")
    except Exception as e:
        print(f"Single embedding failed: {e}")
    
    # Test batch embedding
    try:
        texts = ["Hello world", "This is a test", "Embedding service works"]
        response = requests.post(f"{base_url}/embed-batch", json={"texts": texts})
        print(f"\nBatch Embedding: {response.status_code}")
        data = response.json()
        print(f"Count: {data['count']}")
        print(f"Dimension: {data['dimension']}")
    except Exception as e:
        print(f"Batch embedding failed: {e}")
    
    # Test model info
    try:
        response = requests.get(f"{base_url}/info")
        print(f"\nModel Info: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Model info failed: {e}")

if __name__ == "__main__":
    test_embedding_service()
