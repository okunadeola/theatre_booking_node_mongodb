const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '68fbb75dd3ca9b0e146c68ce9abc8142',
    // apiKey: 'get from themoviedb.org',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;