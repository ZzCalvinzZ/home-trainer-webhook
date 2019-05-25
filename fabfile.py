from fabric import task


@task
def update(c):
    c.run("pwd")
    with c.cd("~/home-trainer-webhook"):
        c.run("git fetch")
        c.run("git pull")
        c.run("rm -rf node_modules")
        c.run("npm install")
        c.run("sudo service pm2-calvin restart", pty=True)
