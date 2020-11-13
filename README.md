# desafio-database-upload

Learnings :
 1. Starting point : Models and migrations
 2. The code below, from a Model, means that the present table will have a column called provider_id(obvious). But the other part means that for many users to one provider,
 when we pass a provider to the Users, it will get the provider's id and set it to provider_id column. 
```
    @Column()
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User;
```
