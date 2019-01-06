/**
 * Created by Richie on 2018/12/28
 */

module.exports = {
  category: {
    //获取大分类
    getCats: '/cats/lv2/statistics',
    //获取小类
    getMinor: '/cats/lv2',
    //获取分类书籍  @param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  pageNum 分页开始,pageSize页面数量
    getCatsBooks: function (gender, type, major, minor, pageNum,pageSize) {
      if (minor) {
        return `/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${pageNum}&limit=${pageSize}`
      } else {
        return `/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${pageNum}&limit=${pageSize}`
      }
    }
  },
  book: {
    // 书籍详情
    bookInfo: function (book_id) { // @param book_id 书籍id
      return '/book/' + book_id
    },
    // 相关推荐
    relatedRecommendedBooks: function (book_id) { // @param book_id 书籍id
      return `/book/${book_id}/recommend`
    },
    // 作者名下的书籍
    authorBooks: function (author) {   // @param author 作者名
      return `/book/accurate-search?author=${author}`
    },
    // 书源  注意：第一个优质书源为收费源
    bookSources: function (book_id) {  // @param book_id 书籍id
      return `/atoc?view=summary&book=${book_id}`
    },
    // 书籍章节 根据书源id
    bookChapters: function (id) {  // @param id 书源id
      return `/atoc/${id}?view=chapters`
    },
    // 书籍章节 根据书id
    bookChaptersBookId: function (book_id) {
      return `/mix-atoc/${book_id}?view=chapters`
    },
    // 章节内容
    chapterContent: function (link) {  // @param link 章节link
      return `https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`
    },
    //搜索热词
    hotWord: '/book/hot-word',
    // 书籍搜索 (分类，书名，作者名)
    bookSearch: function (content) { //@param content 搜索内容
      return `/book/fuzzy-search?start=0&limit=50&v=1&query=${content}`
    }
  },
  rank: {
    // 排名分类
    rankCategory: `/ranking/gender`,
    // 排名详情
    rankInfo: function (rank_id) { //@param rank_id 分类ID
      return `/ranking/${rank_id}`
    }
  },
  comment: {
    // 讨论
    discussions: function (book_id) {  // @param book_id 书籍id
      return `/post/by-book?book=${book_id}`
    },
    // 短评
    shortReviews: function (book_id) {  // @param book_id 书籍id    完整接口 ?book=5816b415b06d1d32157790b1&limit=20&total=true&start=0&sortType=hottest
      return `/post/short-review?book=${book_id}&total=true&sortType=newest`
    },
    //长评
    bookReviews: function (book_id) {  // @param book_id 书籍id
      return `/post/review/by-book?book=${book_id}`
    },
  },
  bookList: {
    lists: `/book-list`,
    detail: function (id) {  // @param id 书单id
      return `/book-list/${book_id}`
    }
  }
}
