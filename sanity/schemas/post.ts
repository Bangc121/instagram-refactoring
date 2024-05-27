import { validation } from "sanity";

const post = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "author",
      title: "Author",
      type: "reference",
      description: "owner of the post",
      to: [{ type: "user" }],
    },
    {
      name: "likes",
      title: "Likes",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "user" }],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: "Comments",
      name: "comments",
      type: "array",
      of: [
        {
          title: "Comment",
          name: "comment",
          type: "document",
          fields: [
            {
              title: "Author",
              name: "author",
              type: "reference",
              to: [{ type: "user" }],
            },
            {
              title: "Comment",
              name: "comment",
              type: "string",
            },
            {
              title: "CreatedAt",
              name: "createdAt",
              type: "datetime",
            },
          ],
        },
      ],
    },
    {
      name: "image",
      title: "Post Image",
      type: "image",
      description: "Upload a post picture",
    },
    {
      name: "createdAt",
      title: "Created at",
      type: "datetime",
    },
  ],
  preview: {
    select: {
      title: "comments.0.comment",
      subtitle: "author.name",
      media: "image",
    },
  },
};

export default post;
