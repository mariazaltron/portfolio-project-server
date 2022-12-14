'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "series",
      [
        {
          name: "Breaking Bad",
          genres: "Drama",
          number_of_seasons: 5,
          poster_path:
            "https://image.tmdb.org/t/p/original/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
          vote_average: 8.8,
          overview:
            "When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
          tmdb_id: 1396,
          backdrop_path:
            "https://image.tmdb.org/t/p/original/84XPpjGvxNyExjSuLQe0SzioErt.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Better Call Saul",
          genres: "Drama",
          number_of_seasons: 6,
          poster_path:
            "https://image.tmdb.org/t/p/original/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg",
          vote_average: 8.6,
          overview:
            "Six years before Saul Goodman meets Walter White. We meet him when the man who will become Saul Goodman is known as Jimmy McGill, a small-time lawyer searching for his destiny, and, more immediately, hustling to make ends meet. Working alongside, and, often, against Jimmy, is “fixer” Mike Ehrmantraut. The series tracks Jimmy’s transformation into Saul Goodman, the man who puts “criminal” in criminal lawyer.",
          tmdb_id: 60059,
          backdrop_path:
            "https://image.tmdb.org/t/p/original/t15KHp3iNfHVQBNIaqUGW12xQA4.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "The Office",
          genres: "Comedy",
          number_of_seasons: 9,
          poster_path:
            "https://image.tmdb.org/t/p/original/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg",
          vote_average: 8.6,
          overview:
            "The everyday lives of office employees in the Scranton, Pennsylvania branch of the fictional Dunder Mifflin Paper Company.",
          tmdb_id: 2316,
          backdrop_path:
            "https://image.tmdb.org/t/p/original/uEaKtFrTCeBJFPlwESqzZ4QMYK1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("series", null, {});
  }
};
