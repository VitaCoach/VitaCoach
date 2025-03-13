const axios = require('axios');

/**
 * 이미지 검색
 */
const kakaoImageSearch = async (query) => {
  try {
    const response = await axios.get('https://dapi.kakao.com/v2/search/image', {
      headers: {
        Authorization: `KakaoAK ${process.env.REST_API_KEY}`,
      },
      params: { query, size: 1 },
    });
    return response.data.documents; // 이미지 목록 반환
  } catch (error) {
    console.error('Kakao API error:', error.message);
    throw new Error('이미지 검색 실패');
  }
};

/**
 * 블로그 검색
 */
const kakaoBlogSearch = async(query) => {
  try{
    const response = await axios.get('https://dapi.kakao.com/v2/search/blog', {
      headers: {
        Authorization: `KakaoAK ${process.env.REST_API_KEY}`,
      },
      params: { query, size: 5 },
    });
    return response.data.documents;
  }catch(error){
    console.error('Kakao API error:', error.message);
    throw new Error('블로그 검색 실패');
  }
};

module.exports = {
    kakaoImageSearch,
    kakaoBlogSearch
};
