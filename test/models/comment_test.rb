require "test_helper"

TEST_COMMENT = {
  author: "newuser",
  text: "also simple comment"
}

class CommentTest < ActiveSupport::TestCase

  test "find one" do
    assert_equal "simpleuser", comments(:simpleuser).author
  end

  test "find all" do
    assert_equal 2,  comments.length
  end

  test "valid" do
    comment = Comment.create TEST_COMMENT
    assert comment.valid?
    comment.destroy
  end

  test "not valid 1" do
    comment = Comment.new TEST_COMMENT
    comment.author = ''
    assert_not comment.valid?
  end

  test "not valid 2" do
    comment = Comment.new TEST_COMMENT
    comment.text = ''
    assert_not comment.valid?
  end

end

