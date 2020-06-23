export default Vue => {
    return {
        load(components) {
            if (Array.isArray(components)) {
                let promiseAll = []
                components.forEach(component => {
                  if (!window[component.name]) {
                    promiseAll.push(
                      new Promise(resolve => {
                        let script = document.createElement('script')
                        script.src = component.url
                        script.onload = () => {
                            if (window[component.name]) {
                                if (window[component.name].name) {
                                    Vue.component(component.alias ? component.alias : name, window[component.name])
                                } else if (window[component.name].default.name) {
                                    Vue.component(component.alias ? component.alias : name, window[component.name].default)
                                } else if (window[component.name][component.name].name) {
                                    Vue.component(component.alias ? component.alias : name, window[component.name][component.name])
                                }
                            }
                            resolve()
                        }
                        script.onerror = () => {
                          resolve()
                        }
                        document.head.appendChild(script)
                      })
                    )
                  }
                })
                return Promise.all(promiseAll)
            } else if (typeof components === 'object') {
                return new Promise(resolve => {
                    let script = document.createElement('script')
                    script.src = components.url
                    script.onload = () => {
                        if (window[components.name]) {
                            if (window[components.name].name) {
                                Vue.component(components.alias ? components.alias : components.name, window[components.name])
                            } else if (window[components.name].default.name) {
                                Vue.component(components.alias ? components.alias : components.name, window[components.name].default)
                            } else if (window[components.name][components.name].name) {
                                Vue.component(components.alias ? components.alias : components.name, window[components.name][components.name])
                            }
                        }
                        resolve()
                    }
                    script.onerror = () => {
                        resolve()
                    }
                    document.head.appendChild(script)
                })
            }
        }
    }
}