const kakaoUtils = require('../utils/kakaoUtils');

/**
 * 이미지 검색
 */
const getImage = async (name) => {
  try {
    const image = await kakaoUtils.kakaoImageSearch(name);
    return image.length > 0 ? image[0].image_url : null; // 첫 번째 이미지의 URL만 반환
  } catch (error) {
    console.log(error.message);
    throw new Error('이미지 데이터를 가져오는 중 오류가 발생했습니다.');
  }
};

/**
 * 블로그 글 불러오기
 */
const getBlogs = async(name) => {
  try{
    const blogs = await kakaoUtils.kakaoBlogSearch(name);
    return blogs;
  }catch(error){
    console.log(error.message);
    throw new Error('연관된 블로그를 가져오는 도중 오류가 발생하였습니다.');
  }
};


module.exports = {
    getImage,
    getBlogs
}