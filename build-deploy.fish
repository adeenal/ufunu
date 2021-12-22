#!/usr/bin/env fish

# Make sure tree is clean
if not test -z (git status --short -z)
    echo 'Make sure working tree is clean'
    exit 1
end

set commit_message 'Deploy from '(git log -n1 --pretty=format:%H)

yarn build
and gh-pages \
    --dist build/ \
    --message $commit_message \
    --user "Ufunu Deployer <deploy@ufu.nu>"
