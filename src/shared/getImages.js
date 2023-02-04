import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const getImages = async (nextRequest, prevPage) => {
  const { data } = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '31800059-86399197816311d7a5cbd5e2b',
      q: nextRequest,
      page: prevPage,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });

  return data;
};

export default getImages;
