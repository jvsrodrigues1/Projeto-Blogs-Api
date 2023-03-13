/**
 * 
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes 
 */

const PostCategoryModel= (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },

    {
      timestamps: false,
      underscored: true,
      tableName: 'posts_categories',
    },
  );

  PostCategory.associate = ({ BlogPost, Category }) => {
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId'
    });
    Category.belongsToMany(BlogPost, {
      as: 'blog_posts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });
  };

  return PostCategory;
};

module.exports = PostCategoryModel;