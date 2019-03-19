<template>
  <v-app>

    <div class="containers">
      <div
        class="cellphone-container"
        v-for="article in infiniteScrollArticle.articles"
        :key="article._id"
      >
        <div class="movie">
          <div class="menu"><i class="material-icons"></i></div>
          <img
            class="movie-img"
            :src="article.imageUrl"
          >
          <div class="text-movie-cont">
            <div class="mr-grid">
              <div class="col1">
                <h1>{{article.title}}</h1>
                <ul
                  class="movie-gen"
                  v-for="type in article.kind"
                  :key="type._id"
                >
                  <li>{{type}}</li>
                </ul>
              </div>
            </div>
            <div class="mr-grid summary-row">
              <div class="col2">
                <h5>Description</h5>
              </div>
              <div class="col2">
                <ul class="movie-likes">
                  <li>
                    <v-icon
                      size="20px"
                      color="primary"
                    >favorite_border</v-icon>{{article.trumbs_up}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="mr-grid">
              <div class="col1">
                <p class="movie-description">{{article.description}}</p>
              </div>
            </div>
            <div class="mr-grid actors-row">
              <div class="col1">
                <p class="movie-actors"> Created By : <v-avatar
                    :title="asds"
                    color="primary"
                    :size="20"
                  >
                    <img :src="article.createdBy.avatar">
                  </v-avatar>
                  {{article.createdBy.username}}

                </p>
              </div>
            </div>
            <div class="mr-grid action-row">
              <div class="col2">
                <div
                  @click="targetArticle(article._id)"
                  class="watch-btn"
                >
                  <h3>Read More</h3>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <v-btn
      v-if="showMoreEnable"
      color="success"
      @click="More"
    >More Article!</v-btn>
  </v-app>
</template>

<script>
import { INFINITE_SCOLL } from "../../../query/queries";
const pageSize = 2;
export default {
  name: "ArticleList",
  data() {
    return {
      pageNum: 1,
      showMoreEnable: true
    };
  },
  apollo: {
    infiniteScrollArticle: {
      query: INFINITE_SCOLL,
      variables: {
        pageNum: 1,
        pageSize: 3
      }
    }
  },
  methods: {
    More() {
      this.pageNum += 1;
      this.$apollo.queries.infiniteScrollArticle.fetchMore({
        variables: {
          pageNum: this.pageNum,
          pageSize
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          // console.log("prevResult", prev);
          // console.log("fetchMoreResult", fetchMoreResult);
          const newArticle = fetchMoreResult.infiniteScrollArticle.articles;
          const hasMore = fetchMoreResult.infiniteScrollArticle.hasMore;
          this.showMoreEnable = hasMore;
          return {
            infiniteScrollArticle: {
              __typename: prev.infiniteScrollArticle.__typename,
              articles: [...prev.infiniteScrollArticle.articles, ...newArticle],
              hasMore
            }
          };
        }
      });
    },
    targetArticle(id) {
      this.$router.push(`article/${id}`);
    }
  }
};
</script>

<style scoped>
body {
  background: linear-gradient(rgba(30, 27, 38, 0.9), rgba(30, 27, 38, 0.9)),
    url("http://i63.tinypic.com/17s7me.jpg");
  background-size: cover;
}

.containers {
  display: flex;
  flex-flow: row wrap;
}

.cellphone-container {
  width: 375px;

  justify-content: space-between;
  height: 600px;
  background-color: #1e1b26;
  margin: 20px auto 10px auto;
  box-shadow: 5px 5px 115px -14px black;
  border-radius: 4px;
}

.menu {
  position: absolute;
  left: 12px;
  top: 6px;
  z-index: 999;
}
.menu i {
  font-size: 40px;
  color: #fe4141;
  filter: drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.5));
}

.movie-img {
  width: 100%;
  height: 300px;
  background-size: cover;
  z-index: 111 !important;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, black),
    color-stop(0.35, black),
    color-stop(0.5, black),
    color-stop(0.65, black),
    color-stop(0.85, rgba(0, 0, 0, 0.6)),
    color-stop(1, transparent)
  );
  position: relative;
}

.movie {
  background: -moz-linear-gradient(
    top,
    rgba(255, 255, 255, 0) 38%,
    rgba(255, 255, 255, 0.06) 39%,
    rgba(30, 27, 38, 0.88) 53%,
    #1e1b26 55%
  );
  background: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0) 38%,
    rgba(255, 255, 255, 0.06) 39%,
    rgba(30, 27, 38, 0.88) 53%,
    #1e1b26 55%
  );
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 38%,
    rgba(255, 255, 255, 0.06) 39%,
    rgba(30, 27, 38, 0.88) 53%,
    #1e1b26 55%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#1e1b26',GradientType=0 );
  position: absolute;
  background-size: contain;
  background-size: cover;
  z-index: 1 !important;
  width: 375px;
  display: block;
  border-radius: 4px;
}

.text-movie-cont {
  padding: 0px 12px;
  text-align: justify;
}

.action-btn {
  text-align: right;
}
.action-btn i {
  color: #fe4141;
  font-size: 28px;
  text-align: right;
}

.watch-btn {
  display: flex;
  font-size: 20px;
  justify-content: center;
  border: 1px solid #fe4141;
  border-radius: 5px;
  padding: 4px;
  width: 140px;
}
.watch-btn:hover {
  background-color: #fff;
  border-color: none;
  color: #1e1b26;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-duration: 2s;
}
.action-row {
  margin-top: 70px;
}

.summary-row {
  margin-top: 12px;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: "Montserrat", sans-serif;
  color: #e7e7e7;
  margin: 0px;
}

h1 {
  position: relative !important;
  font-size: 36px;
  font-weight: 400;
  text-align: center;
}

h3 {
  font-size: 14px;
  font-weight: 400;
  color: #fe4141;
}

h5 {
  font-size: 12px;
  font-weight: 400;
}
p {
  font-size: 12px;
  font-weight: bold;
}
.movie-gen,
.movie-likes {
  margin: 0px;
  padding: 0px;
}
.movie-gen li,
.movie-likes li {
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  color: #818181;
  width: auto;
  display: block;
  float: left;
  margin-right: 6px;
  font-weight: 600;
}

.movie-likes {
  float: right;
}
.movie-likes li {
  color: #fe4141;
}
.movie-likes li:last-child {
  margin-right: 0px;
}
.movie-likes li i {
  font-size: 14px;
  margin-right: 4px;
  position: relative;
  float: left;
  line-height: 1;
}

.movie-details {
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  font-weight: 300;
  color: #b4b4b4;
}

.movie-description {
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #9b9b9b;
  text-align: justify;
}

.movie-actors {
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  font-weight: bold;
  color: #e7e7e7;
}

.thegrid {
  margin: 0 auto;
}

.elements-distance,
.movie-details,
.movie-description,
.movie-actors {
  margin: 0px;
}

.mr-grid {
  display: flex;
  justify-content: center;
  width: 100%;
}

.mr-grid:before,
.mr-grid:after {
  content: "";
  display: table;
}

.mr-grid:after {
  clear: both;
}

.mr-grid {
  *zoom: 1;
}

.col1,
.col2,
.col3,
.col3rest,
.col4,
.col4rest,
.col5,
.col5rest,
.col6,
.col6rest {
  margin: 0% 0.5% 0.5% 0.5%;
  padding: 1%;
  float: left;
  display: block;
}

/* Columns match, minus margin sum. E.G. margin-left+margin-right=1%, col2=50%-1% - added padding:1%*/
.col1 {
  width: 98%;
}

.col2 {
  width: 47%;
}

.col3 {
  width: 30.3333333333%;
}

.col4 {
  width: 22%;
}

.col5 {
  width: 17%;
}

.col6 {
  width: 13.6666666667%;
}

.col3rest {
  width: 63.6666666667%;
}

.col4rest {
  width: 72%;
}

.col5rest {
  width: 77%;
}

.col6rest {
  width: 80.3333333333%;
}
</style>
