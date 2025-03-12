from fastapi import FastAPI, HTTPException
import pandas as pd
from sentence_transformers import SentenceTransformer, util
from fastapi.responses import FileResponse
import os

# 한국어 출력 가능하게끔
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

app = FastAPI()

dataPath = "C://Users/mini0/OneDrive/바탕 화면/VitaCoach/backend/Data/products2.xlsx"

# 데이터 로드
product_data = pd.read_excel(dataPath)

# 모델 로드
model = SentenceTransformer("C://Users/mini0/OneDrive/바탕 화면/VitaCoach/backend/Model/product_model")  # 올바른 경로로 수정

# 건강기능식품 추천 함수
def find_most_similar(user_input: str):
    # top_k를 2로 고정
    top_k = 2
    
    # 1. 전체 주요 기능 데이터 임베딩
    corpus = product_data['주요 기능'].tolist()
    corpus_embeddings = model.encode(corpus)

    # 2. 사용자 입력 임베딩
    query_embedding = model.encode(user_input)

    # 3. 코사인 유사도 계산
    similarities = util.cos_sim(query_embedding, corpus_embeddings)[0]

    # 4. 상위 k개 결과 반환
    top_results = []
    for idx in similarities.argsort(descending=True)[:top_k]:
        idx = int(idx)  # idx를 정수로 변환
        top_results.append({
            '품목명': product_data.iloc[idx]['품목명'],
            '종류': product_data.iloc[idx]['종류'],
            '주요 기능': corpus[idx],
            '유사도': similarities[idx].item(),
        })

    return top_results

@app.get("/favicon.ico")
def get_favicon():
    return FileResponse(os.path.join("static", "favicon.ico"))

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI app!"}

# 건강기능식품 추천 API
@app.post("/predict")
def predict(user_input: str):
    # 건강기능식품 추천 결과를 반환
    result = find_most_similar(user_input)
    return {"results": result}
