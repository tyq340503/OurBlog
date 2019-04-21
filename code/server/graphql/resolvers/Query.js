function feed(parent, args, context, info) {
    return context.prisma.blogs();
}
  
module.exports = {
    feed
}