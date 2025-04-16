require 'jekyll'

module Jekyll
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      # 从所有文章中提取唯一标签
      all_tags = site.posts.map { |post| post.data['tags'] }.flatten.uniq.compact
      all_tags.each do |tag|
        # 为每个标签生成一个页面
        site.pages << TagPage.new(site, site.source, tag)
      end
    end
  end

  class TagPage < Page
    def initialize(site, base, tag)
      @site = site
      @base = base
      @dir  = File.join('tags', tag.to_s)
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag.html')
      self.data['tag'] = tag.to_s
      self.data['title'] = "标签: #{tag}"
    end
  end
end