module Jekyll
  class Post
    alias_method :original_initialize, :initialize
    def initialize(site, source, dir, name)
      original_initialize(site, source, dir, name)
      if data['date']
        self.date = Time.parse(data['date'].to_s)
      else
        self.date = Time.now
      end
    end
  end
end