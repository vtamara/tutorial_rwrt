# frozen_string_literal: true

class PagesController < ApplicationController
  include ReactOnRails::Controller
  before_action :set_comments

  def simple 
  end

  private

  def set_comments
    @comments = Comment.all.order("id DESC")
  end

  def comments_json_string
    render_to_string(template: "/comments/index.json.jbuilder",
                     locals: { comments: Comment.all }, format: :json)
  end

end
