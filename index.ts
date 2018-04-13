export class EnvItem {
  constructor(public key: string, public value: string) {}

  get number(): number {
      return Number(this.value)
  }

  get boolean(): boolean {
      return Boolean(this.value)
  }
}

export class EnvCollection {
  constructor(private items: EnvItem[]) {}

  get(key: string): EnvItem {
      return this.items.find(item => item.key === key)
  }
}

export class EnvManager {
  static get(key: string): EnvItem {
      return new EnvItem(key, process.env[key])
  }

  static collection(prefix: string, delimiter = "_"): EnvCollection {
      const keyOffset = prefix.length + delimiter.length
      const collection = Object.keys(process.env)
          .filter(key => key.startsWith(prefix.concat(delimiter)))
          .map(key => new EnvItem(key.substr(keyOffset), process.env[key]))

      return new EnvCollection(collection)
  }
}
