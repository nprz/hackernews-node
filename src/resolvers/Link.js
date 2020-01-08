function postedBy(parent, args, context) {
  // context.prisma.link a query based on the datamodel
  // yes that's right, it's a method from the autogenerated
  // crud API
  return context.prisma.link({ id: parent.id }).postedBy();
}

function votes(parent, args, context) {
  return context.prisma.link({ id: parent.id }).votes();
}

module.exports = {
  postedBy,
  votes
};
