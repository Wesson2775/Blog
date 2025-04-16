require 'jekyll'

module Jekyll
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      all_tags = site.posts.map { |post| post.data['tags'] }.flatten.uniq
      all_tags.each do |tag|
        site.pages << TagPage.new(site, site.source, tag)
      end
    end
  end

  class TagPage < Page
    def initialize(site, base, tag)
      @site = site
      @base = base
      @dir  = File.join('tags', tag)
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag.html')
      self.data['tag'] = tag
      self.data['title'] = "标签: #{tag}"
    end
  end
end