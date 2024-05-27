const user = {
  title: "User",
  name: "user",
  type: "document",
  fields: [
    {
      name: "username",
      title: "Username",
      type: "string",
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "string",
    },
    {
      name: "followings",
      title: "Followings",
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
      name: "followers",
      title: "Followers",
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
      name: "bookmarks",
      title: "Bookmarks",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      name: "createdAt",
      title: "Created at",
      type: "datetime",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "username",
    },
  },
};

export default user;
