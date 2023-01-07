<template>
  <!-- 问题详情开始 -->
  <div class="app-shell">
    <!-- 头部开始 -->
    <header
      class="app-header-wrapper app-shell-header border"
      style="background-color: rgb(242, 242, 242)"
    >
      <div class="app-header-left">
        <div class="app-header-item">
          <i class="app-header-icon"></i>
        </div>
      </div>
      <div class="app-header-middle">
        <div class="app-header-title" style="color: rgb(102, 102, 102)">
          问题详情
        </div>
      </div>
      <div class="app-header-right"></div>
    </header>
    <!-- 头部结束 -->

    <!-- 视图容器开始 -->
    <div class="app-view-wrapper">
      <div class="app-view-with-header">
        <!-- 产品开始 -->
        <div class="product-header">
          <div class="img-box">
            <img
              src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b3553083a4975325eab6470d94465548.jpg"
              alt=""
              width="100%"
              height="100%"
            />
          </div>
          <div class="title">Xiaomi 10S</div>
          <!-- <div class="device-hot">10w热度</div>
          <div class="arrow"></div> -->
        </div>
        <!-- 产品结束 -->

        <!-- 问题开始 -->
        <div class="question-list">
          <div class="title">现在买米10s 还是买k40 哪个好 推荐一下</div>
          <div class="author">
            <img
              src="https://cdn.cnbj1.fds.api.mi-img.com/user-avatar/p01mUcqSeNgx/xnYwLXfigcg3dr.jpg?thumb=150x150"
              alt=""
              class="icon"
            />
            <div class="tips">
              <div class="name">京城 &</div>
              <div class="time">提问于2021-10-26 01:04</div>
            </div>
            <div class="follow-btn">关注问题</div>
          </div>
        </div>
        <!-- 问题结束 -->

        <!-- 回答开始 -->
        <div class="answer-list">
          <div class="answer-title">
            <div class="total">共 1278 条讨论</div>
            <div class="switch">
              <div class="btn active">热门</div>
              <div class="btn">最新</div>
            </div>
          </div>
          <div class="list-container">
            <div class="show-answer-list">
              <div class="user-info">
                <div class="user-profile">
                  <img
                    src="https://cdn.cnbj1.fds.api.mi-img.com/user-avatar/16ed8f69-1b82-40cc-b6d1-67998e5aaf5d.jpg?thumb=150x150"
                    alt=""
                  />
                </div>
              </div>
              <div class="right-box">
                <p class="name">
                  G.M
                  <span class="time"> 2021-10-26</span>
                  <span class="buy">已购</span>
                </p>
                <div class="context">
                  做办公室10s,干活就k40，这是主要选择，曲屏不适合干活人。k40.要买就12+256，双11预定2300，你要有些红包还能便宜些
                </div>
                <div class="handler">
                  <div class="handler-item">
                    <span>427</span>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEt0lEQVRoQ+2ZaahVVRTHfzZZaWXQYJKNhkQTRRQVEYUNGEEGDTZgYBAVFEVEBH7Jvlgg2PSlUkIqKirCSs0gspHAJhpsgiRKM5u0stIsfrGObHane86799x3z4MWXN6795yz9/rvNf3XOqMY4TJqhOvP/wASC24D7ARsC2wCfge29NvCTVlgZ+BkYH9gR2A98BXwYfztG44mAGwHXAAcCWiFQjz9n4GXgFf7ZY0mABwCXAyMSVxHKwhM+QN4DnijHyB6BeDzpwGnx+m/E4pOAI4C9oN/EsU6YAHwbdO+1CuAHYDzgGPi9BcFANfdC7gU2DuUfgF4vm0AdBuVPBj4FXgE+DhRUmAXxXetcAfwV5MgerXAOOCKOO2fgPnA6kRB0+otwOhQfHYEdmMYegWwJ3BtKPgdcC+wIdPuJmCP+O0u4MvGtI8A62U9XefKWOBr4M6STHM9sE/ccw+wqpcN82d7tcApwNmx6Arg0RLlUgvMBda0CYCnrxWUJyMDpfpJK24LemHwzoq60BiGXixgerwh3PBP4Hbgh0yzA4Cr4zdjZE5jmsdC3QIwu5wPHB7rfAA8WKLcOcGRvPQ68FQbAFi8zgBODLog63wA+CJTToJ3VVLIFgKflwDQtTZ2Cyy3wPbBafTd9Jr/q7gucTwwPjbUdV4BlgKbMyUOBS4EBFIlHsJK4OVgr65bS1Il5S8nAAcGiPSaLFMAOdt8C1gS9DkP3jMBs9RQ3NRqviySQS0QxeLyFhml+brOhtJkFX8P+K3kqMbG6UvmqkRreziFuPbjwEdVD3pdZaW9U4GT4rsK/ZJxFiuu/N7PE4BB27Xflii2L3AuMDF0eBN4OghiRxwC2AW4LPxbXyxONjXhrUmFtTD1Q8xoZjYznAnBoM9pyb/2FcBuQcjM6xIyM0peLc3xhfQLgO42Iw7UdtT+wda00gI5gPuBb7KnhgPAEWEBu7lPgIeDoo8IAHlnZw/9bElqruVCg7CA/YKd3dGh9DPAa1XuU2ShNrjQrsDlgNnIDPgQ8NlIAmACuSZmSt9HY1QZwG2yQNo7fwroxrV657I0OogYcDB2bLjMYuDFzH3U077DomuG2jqybAMAdbgZ2D2ULuubpToClDC+nc6X2gBAmnJjUAjJnJOLlAVYmY8DDHRFrrS8uKcNAGTA00K5vDGS/U4O90lJplTDe7e0AYA8zCqsSOAsYoU4jjHArROpOL53jLlm0AB0D9OnPq7b3J2M46XZjuwlm2Vij71i0ABSArc20uePEQ+HRXPVqZ6tHDQAM4t9gA3N+8Bj0SD5XVqhhTrJxkECMEDPStpOc7+9tTm+6MHTFrYMyNYgnhmNetmA1gf7Qaf17enApBh2ORizx1aGBMD+1RH5QbGQr4RMUWkuvi6BP6/CrHUuO6nwBYj53eoq/7kPMDCVIbmQ0T4FODWmDr4Syvvdooi4eC2SVYHCPQVRuIgvP5xGFPxHC9QOYveSUl8Sr4Sq/K7OCde9xx783RgU5OStdhotNhOEQ6uyuVBdhere5+RDt/FtjtlHq5dJrUKWPijq4mV1XWW6uc9Mo9J+OtHmWlSiGwWG85lKMjecynS7V0c63e2iw/ncfzY0fwNGvywUlioD+QAAAABJRU5ErkJggg=="
                      alt=""
                    />
                    <div class="handler-box">
                      <div class="handler-container">
                        <div class="hander-item">
                          <div class="item">
                            <img
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEWUlEQVRoQ+2Za6iUVRSGn2NmN82CzIxM0/ohdKGIokKkqIwiMEFLKxIKooIkERGhP9kfE4LK/NONiAoLjdA0LYjoSlBYqGklFGFmWdlNTbvxyBrZZ/vN5Zz5Rr8BFwznzMw3e7/vXmuv/a61e+hy6+ly/BwmUMeDA4BjgCOAvcBfwL+d8HYnPHAsMB4YBRwN/AZsATbE31J5lE1gIDAVOBfQCzVz9f8A3gbeK9MbZRM4C5gOHJeEjl6QmLYHWAl8WBaJMgk41hXAVbH6awPoqcB5wOmwL2lsB54BfiwjlsokMAiYDFwQq788CDjHycAtwPAA/SawpmoEDBtBjgV2Ai8CmxKQErsp3uuFhcB/7ZIo0wMnAHfEav8KPA1sTQCaVucBRwXw+bGx2+JQJoFhwL0B8CdgMfB7hm4OcFJ89hjwbVvoY1O1O0bt94bOnfHmO+DRgkxzHzAinnkc+Kbdycv0wATgugD0MbCkAFzqgYeB76tEwNXXC9qyyEApPmXFgyEv3Lz3x7nQFoeyPGB6nBUh+Q/wEPBLhmw0cHd85h5Z0Bby+HEZBMwuU4CzY8z1wLMF4K4PjeRXHwCvVIGAh9fVwKUhF1SdTwFfZ+AUeHclB9lzwOYmBAyzXc1INvLAkaFpjN30Of8XuCFxMXBKTGLovAusBv7OJh4H3AhIpC/mgmwE3gkl6xy9rB4B9cslwBlBIn1OlSmBXG1+Arwe8jnfvBMBs1R/Q9aT/Y1IDL1IFA2oblFRmq9bmVCZLPDPgN0Fyzs4Vl8x1xfT8y5UzZznZeDzdJAcoLL3WuCyAC+gPzPN4omrvve1FHDTNo3VviBPnj0NmASMDDwfAa+GWNz3WE5gCHBrxLfxV1vZ1G0PJCesB1OnzexmljPbmRxMAPslSk5gaAgy87qCzIySn5bm+JodDAKG3m2Ai2tpai1hmVrogZzAk8C2bIkPNoFzwgNWdl8AL4Rc7woCeZVnPf1amqabhdCh9oC1g1Xe+QF6BfB+oyxUtRA6HpgBmI3Mhs8DX3UTAZPJPdFf+jmKpP0buCiNVs0DaR39JWBI96qjq74HbJJdGCGzCngrP3SqTEBsc4ETA3RhDV1lAkqW2aEWFHN2MZqq0SrtAdXwDbH69YqkA7RQlQioyTyFNQWch9gBVtUQUriZPpX2hs2ieq35qhJIBdwPkT53dJMHTJ3WARY064CX6hRLldwDlqrXJCWoud86u/CKqiiEbo9CvahBqxc7LafV/dOAM6PxZZPMervQcgLWr7bIx8SPvRIyhaX5d2Yy0iP1Bu7n53YtvAy5KNo06p8nABthLRGwkL4SuDy6Dl4J5fWuCrFmvYRVP0GnP3N+SdQ6Hl6E2I2oe49Q1HXwLLg5roTS1kkJ+Foewnr802gaNLwEqdc2kYRNq6K+UMso+vGgXRDDxpsds48R0NAa9X10Z+2yutk4ZX1vphG0r5aun1ppXJUFriPjHCbQkWXtw6D/A+DYBUBdXGYuAAAAAElFTkSuQmCC"
                              alt=""
                            />
                            <div>
                              <p class="text"><span>88</span></p>
                              <p class="text">有用</p>
                            </div>
                          </div>
                          <div class="item">
                            <img
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEX0lEQVRoQ92ZaahVVRiGn2vzqEFlRVlZ/hAaQKKyiCgaxAgiqMyKBIWoQDEwIuiP9ScDQcv+ZFpERUVJNFAZRVQaQpLRbEEZmjZok5UNJk98W5bLfYbd3fd4tgsu95y919nre7/5e/cADV8DDZef3RrAHsB+gP97tbYCf8bfv90c2soCw4EzgOOBA6BnlvoD2Ah8CnwQQNriKAOg8NcAo4Bh3WhhCPZsAVYBTwNtLZED0F0uAM4L4TXn75mAByfff65ZeM/fP1Hcq8DSdiByAAcC1wKjw3xvAB8C/ySCzkg+z6sZgMKfCpwO7Bnu9ADwQ6tzcgC6z1TgCOAnYBHwTfbjOcn3W2sG4OMOAq4GTgwlPgOsrAJgGjAyACwENvQYgHE3ATg3ksfrwMuAGWqnVWaBXQ1AIU8DLgP2jmz0JGCGagwAM+D14U7fAnrCj00CYAG9GTg8Esh9wNomAVBWs+EpIfSzwNtNA3AmcHkIbSp/uGkADgVmRSaymM7O6tF/ePo1CxWy3QYcEpo3DtbkVuhnAMp6ZaRUP78EvNY0AOOASSH06kinOzR3/W4BOwLT6b7RF90P7NBA9jsAO98pwNHAZuBR4PPUjfodgK2EqVRX+ht4HljWJAAq+HzgwpgRLGYvBJi+T6OFok8Grog4+Ax4DPituNlpHngQWN/jdjrPlGljZz+0OA3kHIDDxHXAcYBzqbn3/awCWhGL3nwoBpocwElhARu8L4FHgF9aWcAxbiJwdlRpe3CjP829hwUgrzl026fkc3NZ2/J/rpl9nAuOCXlWADZ2f7UC4HVb2MnAkV3SKb8mliobOpyzrwqWowoIB3yzULE85yng43ZZqLh3FDC+BS/kyOeDU8pFl3Ju1eVypkJBLk5GxCogir0GrezEO3lD145a3CtILQVI9/lZAMaJ5JcEgEvm4q2YX83Z6RobVpB1qLKMw0+AN2OgSdmR0jRa5eHuFchFwFlBg3igmctgS5eC3xhkgdcNxC86HGaMdYytOshds4N52mzh+gh4qES4S4Fz4vpyYElVbZXtrwOAz7XpuiVcTTPLHW3KDtTlboprElV39xMAZbkBOCGEkowy4NJlLN0VbLfucUc35G0nkHVZwHMkoi6JA98Fnig53MLnqOiaW1LlO8m70/06Aah9reBaB8wvYdNmRn1xzwLgq8oSZz+oE4AVejqwT5CxDh/bS36cm1rgXuDrfgIwApCWtJKXEcNmq9sDoDFwJ2B1HdSq0wK+yZGM0pWsnI/Hm5ZCwHS+/R64p9PLi26Q1QkgnZ5stp6LTOQZWkVwpluXLy5e6UbATnvqBJBPT+8FAPsqKcJjo06ofXv67zoJ1839OgF43pjoZHUnrWBrIaNgm+7yldWLAayU7+9G6HRP3QAUVDJKjefdqgHrKyvn2lqEF0jdAHymjZs9jy6j9m2vHQXtkUop8qpaH0oLFM9W+8VL8sKVatN6LwAMRqmVfjsULlRJgMFubjyAbc3yBUBf9DqyAAAAAElFTkSuQmCC"
                              alt=""
                            />
                            <div>
                              <p class="text"><span>3</span></p>
                              <p class="text">无用</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="reply-list">
                  <div class="reply-item">
                    <p>
                      <span class="reply-name">2155***462</span>
                      <span class="text"> 回复</span>
                      <span class="reply-name">@zhanrong :</span>
                      对，手感不错。配置感觉都差不多。
                    </p>
                  </div>
                  <div class="reply-item">
                    <p>
                      <span class="reply-name">✨即将暴富✨ :</span>
                      10s功能多 体验好些
                    </p>
                  </div>
                  <div class="reply-item">
                    <p>
                      <span class="reply-name">@zhanrong :</span>
                      我选k40s吧
                    </p>
                  </div>
                  <div class="reply-more">
                    <span>展开 7 条回复</span>
                    <img
                      class="icon"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAYAAADFniADAAAB9ElEQVRYR+3W28tMURzG8c/r+IokRXkdckVIyYUQcYEUfy4lXBAhF1JCXMmxKEnkfOjR2prGOzNrz8zFpL2vdtNv/fazvs+zfmvmzOAzN4OadKJqXelIdaRqCdTWdZn6r0mtxTze4nvtTofULcN6fMb7QXXDMrUKp7ECT3AbvyYQlm8dwHZ8xQV8WqzfMFGbcaYsipiHuIGfYwhbgsPYxd+r7TxetBW1FKewgLzHvvu4iy8thK3EPuxB7PuBl7hY3v9pNWokJFMHsQ3ZbbCHWK2VjWUhlBiE8lPcGjdTzQ5W4wQ2FGHZ6WNcH5GxCDqCHYV0BL3BZXwcRnoUqWZtQn8SG4uwZOwe7hR6/d8Ilf3YWzIUQa9xaVC4exvUisqaNSWsW8vOY+WDIqx3XCQ3EbS7WBayz8oh+VCTxTai0i8ZO4pNhdg3PMLNYmX6HcJOLC8ZeoVrwzLUL7StqKzPMD2LdT1W5lTGyhDKKUvfWPYO58qwrIH0p2YcUVmXjB1DZlnGRYhFQISGUCzLDLpak6FpkGp6xMoMxC2FWPN7CD0vGRp4lUzj9A3qEWKZ+o2VjWWZ1oteITUejmtfb+9k7HgRFguvtM3QNO3rFxZaEZV/ABM90yA1kYC2F/LUP1bbsCPVkaolUFvXZaojVUugtm4mM/UbU9paJoWcdaEAAAAASUVORK5CYII="
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 回答结束 -->

        <!-- 底部开始 -->
        <div class="bottom-action">
          <div class="bottom-action-left">
            <div class="bottom-action-btn">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAC4lBMVEUAAAAAAAD///+AgICqqqqAgIC/v7+ZmZmAgICqqqqSkpK2trafn5+Ojo6qqqqZmZmioqKVlZWdnZ2SkpKZmZmPj4+cnJyZmZmXl5ebm5ufn5+ZmZmdnZ2Xl5eZmZmXl5ebm5uenp6ZmZmYmJiWlpadnZ2Tk5Obm5uYmJicnJyZmZmYmJidnZ2Xl5eZmZmdnZ2VlZWampqcnJyZmZmYmJidnZ2ampqZmZmdnZ2bm5udnZ2bm5uYmJiZmZmampqYmJiampqYmJiZmZmcnJyampqYmJiampqbm5uZmZmXl5eYmJiampqZmZmcnJyampqZmZmampqampqbm5uampqYmJiampqcnJyampqZmZmbm5uZmZmYmJiXl5eZmZmbm5uampqZmZmampqYmJiampqXl5eZmZmYmJiampqWlpaZmZmXl5eZmZmcnJyYmJiampqYmJiampqbm5uampqXl5eZmZmZmZmbm5uampqbm5uampqXl5eampqampqZmZmYmJiYmJiampqZmZmZmZmYmJiampqZmZmZmZmYmJiXl5eZmZmYmJiampqampqampqbm5uampqZmZmYmJiZmZmZmZmYmJiampqXl5eZmZmZmZmXl5eYmJiampqampqZmZmampqZmZmampqampqampqZmZmampqZmZmZmZmYmJiZmZmZmZmampqZmZmZmZmZmZmZmZmXl5eZmZmZmZmampqYmJiampqXl5aYmJiampqXl5eZmZmYmJiXl5eZmZmampqXl5eZmZmYmJiampqYmJiZmZmXl5eZmZmZmJiXl5eYmJiZmZmampqXl5eZmZmYmJibmpqZmZmZmZmZmZmZmZmWlpaampqZmZmXl5eZmZmYmJiYmZmZmZmampqZmZmXl5eYmJiZmZmampqXl5eZmZmXl5eZmZmXl5eZmZmXl5eZmZmXl5eYmJiZmZmampqWl5eXl5aXl5eYmJiYmJmYmZiYmZmZmJmZmZkNHdk+AAAA7XRSTlMAAQECAwQEBQYGBwcICQkKCwwNDg8QEhQWFxgZGhseICEiIyUnJygpKiwtLy8xMjQ1NTY3OTk6PDxAQUJFRkdISUpLS0xNTk9QUVJTVVVWWltdXmBhYmRlZmZnaGlpaWpub3Jyc3N0dHV1dnZ2d3d5eXp8fYCCgoOEiImJi4yQlZWWmZqcnZ6foKChoaapqquvsLG2uLi7u76/v7/AwcLDxMfKy8/Q0tTV1tbX2Nrb3Nzd3t/g4eHh4uLj5OTl5+fo6Onp6urr7O3t7e7u7+/w8fLz9PT19vb39/f3+Pn5+fn6+vv7/Pz9/f7+/v5H/ubaAAACk0lEQVQYGe3BZVRTARgG4Hf3bkznFAMDFLtbsRMR7O5W7O7u7u7EVuzu7u6JHeBwCOon4vtfUO+OwvEOf3mOx+fBf/8CpWi/PgUU/BG1zonQ0LMV8SfMNS9LrJBqZiSapc0tkavH5cPhWiYkkqX7DZGLpWqdlsijpZE4ybs4JPKQL9QWt0Su+KhIBPchDpGQJibA1OqKyJ4KRrhk7XX/k8ibsakAGBvfkHdbC8AVt/bPGOUQcfQ0AnDr/EBkAVzw6P+c3DnuvEh4VysA6ySRECN0eYx4Su4oYa0fLhI+2ALkXiFyXoWuYRHkjmwA/Bwioa1V75UiMgh60o+KIDeUMgAwtb4q8rjpUpEX0zNAh9fE95+5vrCCOCkDIz/KGxGZkAk6rJPtjA7ywg9ubd5JrJFW6PCcQXJ5HjjlOiDycmZa6Mg+h+SivNAo5YL5SWZkho70C+3kvHRwKrONtA9MCx2eS8iI+d7QKAV3kvcHmPF7hvzLyKjZWaAxVtlHvh6QBjpyrHrLiPHpoFED9kbzaTN3/J7BcxNpn+wBjVLy5Bfeawkdqs8mMmxiBmjM1U+RdwJTQIfPxig+H+oBjanBSfJuQyt0eB0hw4Zb4FT5JnmvBnQtJh+NSA2Npe518kxTM3StZswsd2iStb1GXqqXFPrWRLMvnBrdJi+UVeFCENkbP1gb2MiDtVW4EsToXvguVZcn5LHqJri0luyBb0yd7pL7i6lwbR05zPubdmHkrvIGGJMmkETBL9aR54KDg7dt324nd1dSkbHb6DHxjWqu4mdzY+i0JZ8CdHjNhGxF8LOcZ2wP49hsts2FEKvjW8YTQ74qjl9k9Q3w969a1c/PNw/iZBw6dVp8UwLhipKAAf/9LV8BF0VtW4T+J7kAAAAASUVORK5CYII="
                alt=""
                class="i-pen"
              />
              一起讨论吧
            </div>
          </div>
          <div class="bottom-action-right">
            <div class="bottom-action-ctrl">
              <div class="action-icon">
                <img
                  src="https://m.mi.com/static/img/m_b_share.ac01313399.png"
                  alt=""
                  class="icon"
                />
              </div>
              <div class="action-icon">
                <img
                  src="https://m.mi.com/static/img/m_b_praise_a.b483bc60a9.png"
                  alt=""
                  class="icon"
                />
                <span>92043</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 底部结束 -->
      </div>
    </div>
  </div>
  <!-- 问题详情结束 -->
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.app-shell {
  // 头部开始
  .app-shell-header {
    background-color: rgb(242, 242, 242);
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 50%;
    width: 375rem;
    transform: translateX(-50%);
    & > div {
      display: flex;
      align-items: center;
    }
    .app-header-item {
      display: block;
      width: 31.25rem;
      margin: 0 10.417rem;
      .app-header-icon {
        background-color: transparent;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        display: block;
        overflow: hidden;
      }
    }
    .app-header-left {
      .app-header-icon {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAABfUlEQVR4AWL4//8/oH1zzA4gCMJgbNv239i2beP+R8gXczpmV79XB9ja3UEDDJCAIAQhCEF/TBAgCEEIUkSKFrEoahD0VFCdOLtmWxQh6E5Okzh7xCyC7n85T+lyL0jREJDT434NMr6cAde7mLHmXDDkfptX1AfkjPk+B9lyRn0fFO01Z8r9SVrRGJAzLaL9CrJ/q4XvlnPBX5IT4/qyqqgJyFkWcX5v8/aXsyKSXKc7FLUBORuGHAeC7K18y5DjQ5CiOiBnU6T6zSjav9WWSPebcrV3qz2R4Tcnba85hyLTb9Le/nL2RY7fqsbLcnJdl30MOSeiwG9dzD4hX1DitnCoSBDlhpwy15VVRY9YDvxWhd/xYAjiF2ORLnYviG3+45dTDopcNbisftvvRrrjlQmzNAeCSLmStP9OSZR9KBx+6cK95LH0TPMC7S80UNGCRxMnbcA0kg8iiFEEhlkYh2Kg7vd/STvPj2Qy1NvKUO+PgCAEIQhBCEIQghAE53kdVfEUUHFYAAAAAElFTkSuQmCC);
        width: 26.039rem;
        height: 26.039rem;
      }
    }
    .app-header-middle {
      flex: 1;
      font-size: 15.625rem;
      .app-header-title {
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
      }
    }
    .app-header-right {
      min-width: 52.078rem;
    }
  }
  .app-shell-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: rgb(255, 255, 255);
    color: #666;
    padding: 0;
    transition: transform 0.2s ease-out;
  }
  .border {
    border-bottom: 1px solid #f5f5f5;
  }
  // 头部结束

  // 视图容器开始
  .app-view-wrapper {
    .app-view-with-header {
      padding-top: 50px;
      background: #f5f5f5 !important;
      min-height: 100vh;
      color: #3c3c3c;
      margin: auto;
      box-sizing: border-box;
      margin-bottom: 50rem;
      // 产品开始
      .product-header {
        height: 41.664rem;
        padding: 0 16.667rem;
        position: fixed;
        z-index: 9999;
        top: 50px;
        left: 0;
        right: 0;
        background: #fafafa;

        -webkit-box-align: center;
        align-items: center;
        display: flex;
        -webkit-box-flex: 1;
        flex-wrap: nowrap;
        .img-box {
          border-radius: 5rem;
          margin-right: 12.5rem;
          line-height: 37.5rem;
          img {
            width: 22.391rem;
            height: 29.688rem;
            align-items: center;
            vertical-align: middle;
          }
        }
        .title {
          font-size: 12.5rem;
          color: #000;
          line-height: 14.578rem;
        }
        // .device-hot {
        //   font-size: 12.5rem;
        //   line-height: 12.5rem;
        //   color: #999;
        // }
        // .arrow {
        //   width: 20.828rem;
        //   height: 20.828rem;
        //   background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA9CAMAAAApvJHbAAAAV1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOl5NtAAAAHXRSTlMAAQIDBAUGERIXGSAhIiMkJSYnKCksNEBBQkNERQpW9+0AAACfSURBVEjH7ZVZEoMwDENZShcIodCFJnn3P2fvIH0w0+b9a6w4ttw0lUrlz2jH19jL6luB7ayqn0De1OqXDLB0onzaAdZBU/dTAfJ6UqsDsKidCzvAopoPCch30Xw7A5Somp8/AFGs3s8JKKr5LgJk2XxMQLmK6uEN8DigtvVur+fOf1uz5s25tWPB2G8vW6xc8zLVy3Pvlnh3rFKp/ABfuAgRatQVDBMAAAAASUVORK5CYII=)
        //     50% no-repeat;
        //   background-size: 100% 100%;
        // }
      }
      // 产品结束

      // 问题开始
      .question-list {
        background: #fff;
        padding: 13.542rem 16.667rem 16.667rem;
        margin-top: 50px;
        text-align: left;
        .title {
          font-size: 16.6667rem;
          line-height: 25rem;
        }
        .author {
          margin-top: 16.667rem;

          display: flex;
          -webkit-box-flex: 1;
          flex-wrap: nowrap;

          -webkit-box-align: center;
          align-items: center;
          .icon {
            width: 25rem;
            height: 25rem;
            border-radius: 25rem;
            margin-right: 10.417rem;
          }
          .tips {
            .name {
              font-size: 12.5rem;
            }
            .time {
              font-size: 12rem;
              color: rgba(0, 0, 0, 0.3);
              padding-top: 2.604rem;
            }
          }
          .follow-btn {
            width: 66.664rem;
            height: 25rem;
            background: rgba(255, 89, 52, 0.07);
            border-radius: 12.5rem;
            font-size: 12.5rem;
            color: #ff5934;
            line-height: 25rem;
            text-align: center;
            margin: 12.5rem 0 0 auto;
            display: block;
          }
        }
      }
      // 问题结束

      // 回答开始
      .answer-list {
        margin-bottom: 60.417rem;
        margin-top: 8.333rem;
        background: #fff;
        overflow: hidden;
        .answer-title {
          height: 44.828rem;
          line-height: 44.828rem;
          border-bottom: 1px solid hsla(0, 0%, 59%, 0.2);
          padding: 0 16.667rem;
          font-size: 12.5rem;
          justify-content: space-between;

          -webkit-box-align: center;
          align-items: center;

          display: flex;
          -webkit-box-flex: 1;
          flex-wrap: nowrap;
          .total {
            color: rgba(0, 0, 0, 0.4);
          }
          .switch {
            width: 82.812rem;
            height: 19.797rem;
            background: #f6f6f6;
            border-radius: 9.8985rem;
            line-height: 19.797rem;
            border: 2.602rem solid #f6f6f6;
            .btn {
              display: inline-block;
              width: 50%;
              border-radius: 9.8985rem;
              text-align: center;
            }
            .active {
              background: #fff;
              color: #ff5934;
            }
          }
        }
        .list-container {
          padding: 0 16.667rem;
          .show-answer-list {
            margin-top: 10.417rem;
            position: relative;

            display: flex;
            -webkit-box-flex: 1;
            flex-wrap: nowrap;
            // 头像
            .user-info {
              .user-profile {
                width: 27.078rem;
                height: 27.078rem;
                border-radius: 50%;
                margin-right: 10.417rem;
                overflow: hidden;
              }
            }
            .right-box {
              border-bottom: 0.516rem solid rgba(0, 0, 0, 0.1);
              text-align: left;
              width: 100%;
              .name {
                margin-bottom: 3.125rem;
                display: flex;
                align-items: center;
                font-size: 12.5rem;
                color: #999;
                .time {
                  margin-left: 5.208rem;
                  padding: 2.604rem;
                }
                .buy {
                  border-radius: 5rem;
                  display: block;
                  color: #ff5934;
                  font-size: 12rem;
                  margin-left: 4.167rem;
                  padding: 1.563rem 3.646rem;
                  border: 1px solid #ff5934;
                }
              }
              .context {
                font-size: 13.5417rem;
                font-weight: 400;
                color: #333;
                margin: 3.125rem 0 10.4167rem;
              }
              .handler {
                position: absolute;
                top: 0;
                right: 0;
                .handler-item {
                  text-align: center;
                  display: flex;
                  align-content: center;
                  justify-content: space-between;

                  position: relative;
                  & > span {
                    vertical-align: middle;
                    margin-right: 2.604rem;
                    line-height: 16.66rem;
                  }
                  & > img {
                    width: 16.664rem;
                    vertical-align: middle;
                    margin-right: 4.167rem;

                    object-fit: contain;
                  }
                  .handler-box {
                    background: url(https://m.mi.com/static/img/box-bg.b2f17a50bc.png)
                      no-repeat 0 0;
                    background-size: cover;
                    width: 160.938rem;
                    height: 63.016rem;
                    position: absolute;
                    right: -13.021rem;
                    top: -62.5rem;
                    overflow: hidden;
                    .handler-container {
                      .hander-item {
                        padding: 20.833rem 10.417rem 12.5rem 20.833rem;
                        overflow: hidden;
                        .item {
                          width: 50%;
                          float: left;
                          text-align: left;
                          -webkit-box-align: center;
                          align-items: center;
                          display: flex;
                          -webkit-box-flex: 1;
                          flex-wrap: nowrap;
                          img {
                            width: 16.664rem;
                            height: 16.664rem;
                            margin-right: 5.208rem;
                            vertical-align: bottom;
                          }
                          .text {
                            height: 13.016rem;
                          }
                        }
                      }
                    }
                  }
                }
              }
              .reply-list {
                background: #fafafa;
                border-radius: 5rem;
                padding: 10.417rem 10.417rem 0;
                margin-bottom: 14.063rem;
                font-size: 12.5rem;
                p {
                  padding-bottom: 10.417rem;
                  color: rgba(0, 0, 0, 0.87);
                  position: relative;
                  .reply-name {
                    color: rgba(0, 0, 0, 0.5);
                    margin-right: 5.208rem;
                  }
                  .text {
                    margin-right: 5.208rem;
                  }
                }
              }
              .reply-more {
                color: rgba(0, 0, 0, 0.5);
                padding-bottom: 10.417rem;
                display: flex;
                align-content: center;

                img {
                  width: 12.5rem;
                  height: 12.5rem;
                  object-fit: contain;
                }
              }
            }
          }
        }
      }
      // 回答结束

      // 底部开始
      .bottom-action {
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 50rem;
        left: 0;
        right: 0;
        padding: 7.813rem 0 7.813rem 12.5rem;
        background-color: #fff;
        border-top: 1px solid #f5f5f5;
        z-index: 999;
        .bottom-action-left {
          flex: 1;
          .bottom-action-btn {
            height: 34.375rem;
            line-height: 34.375rem;
            border-radius: 34.375rem;
            font-weight: 500;
            font-size: 13.5417rem;
            display: flex;
            align-items: center;
            padding: 0 8.333rem;
            background: #f6f6f6;
            color: #999;
            text-align: left;

            .i-pen {
              display: inline-block;
              margin-right: 4.688rem;
              width: 17.703rem;
              height: 17.703rem;
            }
          }
        }
        .bottom-action-right {
          .bottom-action-ctrl {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .action-icon {
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 13.5417rem;
              color: #666;
              font-weight: 500;
              width: 75rem;
              .icon {
                width: 20.828rem;
                height: 20.828rem;
              }
            }
          }
        }
      }
      // 底部结束
    }
  }
  // 视图容器结束
}
// 问题详情结束
</style>