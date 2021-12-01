import { request, gql } from "graphql-request";


//this new env needs to be declared in .env (need to create before)
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    //to be more faster, only use API playground from graphcms and copy query
  const query = gql`
        query MyQuery {
                postsConnection {
                  edges {
                    node {
                      author {
                        description
                        id
                        name
                        photo {
                          url
                        }
                      }
                      createdAt
                      slug
                      title
                      excerpt
                      featuredImage {
                        url
                      }
                      categories {
                        name
                        slug
                      }
                    }
                  }
                }
        }
    `

    //request to get it
    const result = await request(graphqlAPI, query)
    
    //returning connection with enviroment from api enviroment in graphcms
    return result.postsConnection.edges;
};



//Single Articule
export const getPostDetails = async (slug,categories) => {
  //to be more faster, only use API playground from graphcms and copy query
const query = gql`
      query GetPostDetails($slug: String!) {
        post(where: {slug: $slug}){
                    author {
                      description
                      id
                      name
                      photo {
                        url
                      }
                    }
                    createdAt
                    slug
                    title
                    excerpt
                    featuredImage {
                      url
                    }
                    categories {
                      name
                      slug
                    }
                    content{
                      raw
                    }
                  }
                }
              
  `

  //request to get it
  const result = await request(graphqlAPI, query,{slug,categories})
  
  //returning connection with enviroment from api enviroment in graphcms
  return result.post;
};

//get featured post for carousel
export const getFeaturedPosts = async () =>{
  const query = gql`
  query GetCategoryPost() {
    posts(where: {featuredPost: true}) {
      author {
        name
        photo {
          url
        }
      }
      featuredImage {
        url
      }
      title
      slug
      createdAt
    }
  }  
  `;
  const result = await request(graphqlAPI, query)
  return result.posts
}

// Adjacent post for carousel component
export const getAdjacentPost = async (createdAt, slug) =>{
  const query = gql`
  query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
    next:posts(
      first: 1
      orderBy: createdAt_ASC
      where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
    previous:posts(
      first: 1
      orderBy: createdAt_DESC
      where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
  `
  const result = await request(graphqlAPI, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
}


export const getRecentPosts = async () =>{
  const query = gql`
    query GetPostDetails(){
      posts(
        orderBy: createdAt_ASC
        last: 3
        ){
          title
          featuredImage{
            url
          }
          createdAt
          slug
        }
    }
  `
    //request to get it
    const result = await request(graphqlAPI, query)
    
    //returning connection with enviroment from api enviroment in graphcms in all posts
    return result.posts;
}

export const getSimilarPosts = async (categories,slug) =>{
  //in gql can pass params in query
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]){
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last:3
        )
        {
          title
          featuredImage{
            url
          }
          createdAt
          slug
        }
    }
  `
   //request to get it
   const result = await request(graphqlAPI, query, {categories, slug})
    
   //returning connection with enviroment from api enviroment in graphcms in similar posts
   return result.posts;
}


//categories links
export const getCategoryPost = async (slug)=>{
  const query = gql `
    query GetCategoryPost($slug:String!){
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              description
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `
  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
}

export const getCategories = async () =>{
  const query = gql`
      query GetCategories{
        categories{
          name
          slug
        }
      }
  `
   const result = await request(graphqlAPI, query)
    
   return result.categories;

}


///comment

  //using API from api folder to connect to my backend in cms
export const submitComment = async (obj) =>{
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  return result.json();
}



export const getComments = async (slug) =>{
  const query = gql`
      query GetComments($slug:String!){
        comments(where: {post: {slug: $slug } } ){
          name
          createdAt
          comment
        }
      }
  `
   const result = await request(graphqlAPI, query,{slug})
    
   return result.comments;

}
